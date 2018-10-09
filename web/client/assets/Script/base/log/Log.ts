import Native from "./Native";

/**
 * Log util
 */
class Log {
    private static _instance: Log = null;

    public static get Intance(): Log {
        return this._instance || (this._instance = new Log());
    }

    private constructor() {
        if (cc.sys.isBrowser) {
            this.i = console.info;
            this.d = cc.log;
            this.w = cc.warn;
            this.e = cc.error;
        }
    }

    public static ts(): string {
        const d = new Date();
        const dateArr = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
        const timeArr = [d.getHours(), d.getMinutes(), d.getSeconds()];
        return (
            dateArr.join("/") +
            " " +
            timeArr.join(":") +
            "." +
            String(d.getMilliseconds()).padStart(3, "0")
        );
    }

    private static param2str(...p: any[]): string {
        const args = Array.prototype.slice.call(p);
        return args.join(", ");
    }

    public i(...p: any[]): void {
        Native.instance.Log(Log.ts() + " |  INFO   | " + Log.param2str(p));
    }

    public d(...p: any[]): void {
        Native.instance.Log(Log.ts() + " |  DEBUG  | " + Log.param2str(p));
    }

    public w(...p: any[]): void {
        Native.instance.Log(Log.ts() + " | WARNING | " + Log.param2str(p));
    }

    public e(...p: any[]): void {
        Native.instance.Log(Log.ts() + " |  ERROR  | " + Log.param2str(p));
    }
}

const L = Log.Intance;
export default L;
