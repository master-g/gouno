// FIXME: there might be some issues with reverse card

const { ccclass, property } = cc._decorator;

import L from "./base/log/Log";
import UnoCard from "./component/UnoCard";
import NIO from "./network/Network";
import { proto } from "./proto/pb";
import Circle from "./component/Circle";
import ProtoMessage from "./proto/ProtoMessage";
import { UNO, Card } from "./uno/Uno";

@ccclass
export default class UnoMain extends cc.Component {
    @property(cc.Prefab)
    private prefabCard: cc.Prefab = null;

    @property(cc.Label)
    private tableLabel: cc.Label = null;

    @property(Circle)
    private circleComponent: Circle = null;

    private cardZOrder: number = 0;
    private allOfTheCards: UnoCard[] = [];

    // TODO: move selfCards to a component
    private selfCards: UnoCard[] = [];

    // TODO: move opponentCards to a component
    private opponentCards: UnoCard[] = [];

    heartbeatHandler: number = -1;

    onLoad() {
        L.d("================== UnoMain onLoad ==================");
    }

    onDestroy() {
        L.d("================== UnoMain onDestroy ==================");
        NIO.unregisterAll(this);
    }

    start() {
        // init logic
        NIO.init();
        NIO.conn("ws://localhost:9009/ws");

        NIO.registerOnConnect(this, () => {
            L.d("CONNECTED!");
        });

        NIO.registerOnNotify(
            proto.common.Cmd.HANDSHAKE_RESP,
            this,
            (header, body) => {
                L.d("TOKEN", body.token);

                NIO.sendEnterGame(this, (hdr, resp) => {
                    L.d("resp", resp);
                    this.tableLabel.string = `Table:${resp.tid}`;
                    if (resp.discardPile) {
                        resp.discardPile.forEach(c => {
                            this.dealCard(c, true);
                        });
                    }
                    this.setPlayers(resp.players);
                    this.circleComponent.setClockwise(resp.clockwise);
                    this.circleComponent.setColor(resp.color);
                });
            }
        );

        NIO.registerOnNotify(
            proto.game.GameCmd.GAME_START_NTY,
            this,
            (header, body) => {
                L.d("GAME_START_NTY", body);
                this.clearAllTheCards();
                body.discardPile.forEach(c => {
                    this.dealCard(c, true);
                });
                this.setPlayers(body.players);
                this.circleComponent.setClockwise(body.clockwise);
                this.circleComponent.setColor(body.color);
            }
        );

        NIO.registerOnNotify(proto.common.Cmd.KICK_NOTIFY, this, header => {
            L.d("KICK_NOTIFY", header);
        });

        NIO.registerOnNotify(
            proto.game.GameCmd.EVENT_NTY,
            this,
            (header, body) => {
                if (!body || !body.events || body.events.length == 0) {
                    return;
                }
                for (let i = 0; i < body.events.length; i++) {
                    const event = body.events[i];

                    L.d(event);
                    const what = event.event;
                    const isSelf = event.uid == ProtoMessage.uid;
                    if (
                        what == proto.game.Event.EVENT_PLAY ||
                        what == proto.game.Event.EVENT_UNO_PLAY
                    ) {
                        if (!event.card || event.card.length == 0) {
                            continue;
                        }

                        this.circleComponent.setColor(event.color);
                        this.circleComponent.setClockwise(event.clockwise);

                        const card = event.card[0];
                        if (!isSelf) {
                            this.playOpponentCard(card);
                            // move card from other player
                        } else {
                            this.playSelfCard(card);
                        }
                    } else if (what == proto.game.Event.EVENT_DRAW) {
                        if (isSelf) {
                            this.drawSelfCards(event.card);
                        } else {
                            this.drawOpponentCards(event.card.length);
                        }
                    }
                }
            }
        );

        if (this.prefabCard == null) {
            return;
        }
    }

    dealCard(v: number, instant?: boolean): void {
        const x = cc.randomMinus1To1() * 40;
        const y = cc.randomMinus1To1() * 40;
        const startRot = cc.randomMinus1To1() * 180;
        const rot = cc.randomMinus1To1() * 180;
        const duration = 0.6;

        // const v = CardSet[Math.floor(cc.random0To1() * CardSet.length)];

        const c = this.addCardToPos(v, -320, 420);
        c.node.rotation = startRot;

        if (instant) {
            c.node.setPosition(x, y);
        } else {
            c.node.runAction(cc.rotateBy(duration, rot));
            c.node.runAction(cc.moveTo(duration, cc.v2(x, y)));
        }
    }

    addCardToPos(card, x, y: number): UnoCard {
        const c: UnoCard = cc
            .instantiate(this.prefabCard)
            .getComponent(UnoCard);
        c.SetCard(card);
        c.node.setPosition(x, y);
        this.node.addChild(c.node);

        c.node.zIndex = this.cardZOrder;
        this.cardZOrder++;
        this.allOfTheCards.push(c);

        return c;
    }

    clearAllTheCards(): void {
        this.cardZOrder = 0;
        for (let i = this.allOfTheCards.length - 1; i >= 0; i--) {
            const c = this.allOfTheCards[i];
            c.node.removeFromParent();
        }
        this.allOfTheCards = [];
        this.selfCards = [];
        this.opponentCards = [];
    }

    clearSelfCards(): void {
        this.selfCards.forEach(c => {
            c.node.removeFromParent();
            this.allOfTheCards.splice(this.allOfTheCards.indexOf(c), 1);
        });
        this.selfCards = [];
    }

    setSelfCards(cards: number[]): void {
        if (!cards) {
            return;
        }

        // remove previous cards
        this.clearSelfCards();

        for (let i = 0; i < cards.length; i++) {
            const c = cards[i];
            const card = this.addCardToPos(c, 0, 0);
            this.selfCards.push(card);
        }

        this.repositionSelfCards();
    }

    drawSelfCards(cards: number[]): void {
        for (let i = 0; i < cards.length; i++) {
            const c = this.addCardToPos(cards[i], -320, 420);
            this.selfCards.push(c);
        }
        this.repositionSelfCards();
    }

    playSelfCard(card: number): void {
        for (let i = this.selfCards.length - 1; i >= 0; i--) {
            const unoCard = this.selfCards[i];
            const value = UNO.getValue(card);
            if (card != unoCard.card) {
                continue;
            }

            unoCard.node.zIndex = this.cardZOrder;
            this.cardZOrder++;

            unoCard.node.stopAllActions();
            const x = cc.randomMinus1To1() * 40;
            const y = cc.randomMinus1To1() * 40;
            const rot = cc.randomMinus1To1() * 180;
            const duration = 0.6;
            unoCard.node.runAction(cc.rotateBy(duration, rot));
            unoCard.node.runAction(cc.moveTo(duration, cc.v2(x, y)));
            this.selfCards.splice(i, 1);

            this.repositionSelfCards();
            return;
        }
    }

    repositionSelfCards(): void {
        if (this.selfCards.length == 0) {
            return;
        }

        const d = 60;
        let startX = 0;
        const cardCount = this.selfCards.length;

        if (cardCount % 2 == 1) {
            startX = Math.floor(cardCount / 2) * -d;
        } else {
            startX = (-(cardCount - 1) * d) / 2;
        }

        for (let i = 0; i < cardCount; i++) {
            const card = this.selfCards[i];
            card.node.stopAllActions();
            card.node.runAction(cc.moveTo(0.6, startX + d * i, -380));
        }
    }

    clearOpponentCards(): void {
        this.opponentCards.forEach(c => {
            c.node.removeFromParent();
            this.allOfTheCards.splice(this.allOfTheCards.indexOf(c), 1);
        });
        this.opponentCards = [];
    }

    setOpponentCards(count: number): void {
        this.clearOpponentCards();

        for (let i = 0; i < count; i++) {
            const card = this.addCardToPos(0, 0, 0);
            this.opponentCards.push(card);
        }
        this.repositionOpponentCards();
    }

    drawOpponentCards(count: number): void {
        for (let i = 0; i < count; i++) {
            const card = this.addCardToPos(0, -300, 0);
            this.opponentCards.push(card);
        }
        this.repositionOpponentCards();
    }

    playOpponentCard(card: number): void {
        const unoCard = this.opponentCards[this.opponentCards.length - 1];
        unoCard.node.zIndex = this.cardZOrder;
        this.cardZOrder++;

        unoCard.SetCard(card);
        unoCard.node.stopAllActions();
        const x = cc.randomMinus1To1() * 40;
        const y = cc.randomMinus1To1() * 40;
        const rot = cc.randomMinus1To1() * 180;
        const duration = 0.6;
        unoCard.node.runAction(cc.rotateBy(duration, rot));
        unoCard.node.runAction(cc.moveTo(duration, cc.v2(x, y)));
        this.opponentCards.splice(this.opponentCards.length - 1, 1);

        this.repositionSelfCards();
    }

    repositionOpponentCards(): void {
        if (this.opponentCards.length == 0) {
            return;
        }

        const d = 10;
        let startDeg = 90;
        const cardCount = this.opponentCards.length;

        if (cardCount % 2 == 1) {
            startDeg = 90 + Math.floor(cardCount / 2) * -d;
        } else {
            startDeg = 90 + (-(cardCount - 1) * d) / 2;
        }

        for (let i = 0; i < cardCount; i++) {
            const card = this.opponentCards[i];
            card.node.stopAllActions();
            card.node.runAction(cc.rotateTo(0.6, startDeg + d * i));
            card.node.runAction(cc.moveTo(0.6, cc.v2(-300, 0)));
        }
    }

    setPlayers(players: any[]) {
        if (!players || players.length == 0) {
            // TODO: clear player`
            return;
        }
        players.forEach((p, i) => {
            if (p.uid == ProtoMessage.uid) {
                this.setSelfCards(p.cards);
            } else {
                this.setOpponentCards(p.cards.length);
            }
        });
    }
}
