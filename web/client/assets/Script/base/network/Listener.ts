import L from "../log/Log";

export default class Listener {
    public listener: Object = null;
    public receiver: Function = null;
    public userdata: any = null;

    public constructor(listener: Object, receiver: Function) {
        this.listener = listener;
        this.receiver = receiver;
    }
    public invoke(...args: any[]): void {
        this.receiver.call(this.listener, ...args);
    }
}
