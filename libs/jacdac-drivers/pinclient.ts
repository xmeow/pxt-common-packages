namespace jacdac {
    //% fixedInstances
    export class PinClient extends Client {
        constructor() {
            super("io", jacdac.IO_DEVICE_CLASS, 0);
        }
    }

    //% fixedInstance whenUsed block="pin client"
    export const pinClient = new PinClient();
}