const { ccclass, property } = cc._decorator;

import L from "./base/log/Log";
import UnoCard from "./component/UnoCard";
import { CardSet, Card } from "./uno/Uno";
import NIO from "./network/Network";
import { proto } from "./proto/pb";
import Circle from "./component/Circle";
import ProtoMessage from "./proto/ProtoMessage";

@ccclass
export default class UnoMain extends cc.Component {
    @property(cc.Prefab)
    private prefabCard: cc.Prefab = null;

    @property(cc.Label)
    private tableLabel: cc.Label = null;

    @property(Circle)
    private circleComponent: Circle = null;

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
                });
            }
        );

        NIO.registerOnNotify(
            proto.game.GameCmd.GAME_START_NTY,
            this,
            (header, body) => {
                L.d("GAME_START_NTY", body);
                body.discardPile.forEach(c => {
                    this.dealCard(c);
                });
                this.setPlayers(body.players);
            }
        );

        NIO.registerOnNotify(proto.common.Cmd.KICK_NOTIFY, this, header => {
            L.d("KICK_NOTIFY", header);
        });

        NIO.registerOnNotify(
            proto.game.GameCmd.EVENT_NTY,
            this,
            (header, body) => {
                L.d("nty", body);
                body.events.forEach(singleEvent => {
                    if (
                        singleEvent.event == proto.game.Event.EVENT_PLAY ||
                        singleEvent.event == proto.game.Event.EVENT_UNO_PLAY
                    ) {
                        if (singleEvent.card) {
                            const card = singleEvent.card[0];
                            this.dealCard(card);
                        }
                    }
                });
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

        const c: UnoCard = cc
            .instantiate(this.prefabCard)
            .getComponent(UnoCard);
        c.SetCard(v);
        c.node.setPosition(-318, 439);
        c.node.rotation = startRot;
        this.node.addChild(c.node);

        if (instant) {
            c.node.setPosition(x, y);
        } else {
            c.node.runAction(cc.rotateBy(duration, rot));
            c.node.runAction(cc.moveTo(duration, cc.v2(x, y)));
        }

        this.circleComponent.setCard(v);
    }

    addCardToPos(card, x, y: number): UnoCard {
        const c: UnoCard = cc
            .instantiate(this.prefabCard)
            .getComponent(UnoCard);
        c.SetCard(card);
        c.node.setPosition(x, y);
        this.node.addChild(c.node);

        return c;
    }

    setSelfCards(cards: number[]): void {
        if (!cards) {
            return;
        }

        const d = 60;
        let startX = 0;
        if (cards.length % 2 == 1) {
            startX = Math.floor(cards.length / 2) * -d;
        } else {
            startX = -(cards.length - 1) * d / 2;
        }

        L.d("start position", startX);

        for (let i = 0; i < cards.length; i++) {
            const c = cards[i];
            this.addCardToPos(c, startX + d * i, -380);
        }
    }

    setPlayers(players: any[]) {
        if (!players || players.length == 0) {
            // TODO: clear player
            return;
        }
        players.forEach((p, i) => {
            if (p.uid == ProtoMessage.uid) {
                this.setSelfCards(p.cards);
            }
        });
    }
}
