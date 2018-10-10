const { ccclass, property } = cc._decorator;

import L from "./base/log/Log";
import UnoCard from "./component/UnoCard";
import { CardSet } from "./uno/Uno";
import NIO from "./network/Network";

@ccclass
export default class UnoMain extends cc.Component {
    @property(cc.Prefab)
    private prefabCard: cc.Prefab = null;

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

        if (this.prefabCard == null) {
            return;
        }

        window.setInterval(() => {
            const x = cc.randomMinus1To1() * 60;
            const y = cc.randomMinus1To1() * 60;
            const startRot = cc.randomMinus1To1() * 360;
            const rot = cc.randomMinus1To1() * 360;
            const duration = 0.6;

            const v = CardSet[Math.floor(cc.random0To1() * CardSet.length)];

            const c: UnoCard = cc
                .instantiate(this.prefabCard)
                .getComponent(UnoCard);
            c.SetCard(v);
            c.node.setPosition(-318, 439);
            c.node.rotation = startRot;
            this.node.addChild(c.node);
            c.node.runAction(cc.rotateBy(duration, rot));
            c.node.runAction(cc.moveTo(duration, cc.v2(x, y)));
        }, 1500);
    }
}
