import ccopy from "./copy";

/**
 * Interact with native OS
 */
export default class Native {
    private static _instance: Native = null;

    public static get instance(): Native {
        if (Native._instance == null) {
            Native._instance = new Native();
        }

        return Native._instance;
    }

    private id: number = 0;
    private map: any = {};

    /**
     * copy string to clip board
     * @param str
     * @param rhand
     */
    public copy(str: string, rhand: any): void {
        if (cc.sys.isBrowser) {
            ccopy(str);
            if (rhand) {
                rhand();
            }

            return;
        }
        // this.call("copy", str, rhand);
    }

    public clip(rhand: any): void {
        // this.call("clip", "", rhand);
    }

    /**
     * invoke native method
     *
     * @param method
     * @param param
     * @param rhand
     */
    public call(method: string, param: any, rhand: any): void {
        if (cc.sys.isBrowser) {
            return;
        }

        if (param == null) {
            param = "";
        }

        let id: number = this.id++;
        let data: any = {
            "method": method,
            "param": param,
            "id": id
        };
        this.map[id] = rhand;

        // TODO: call native here
    }

    /**
     * Log to native
     * @param _txt log content
     */
    public Log(_txt: string) {
        // this.call("log", _txt, null);
    }
}
