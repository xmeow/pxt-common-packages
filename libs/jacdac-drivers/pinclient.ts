namespace jacdac {
    //% fixedInstances
    export class PinClient extends Client {
        digitalReads: Buffer;
        digitalWrites: Buffer;

        constructor() {
            super("io", jacdac.IO_DEVICE_CLASS);
            this.digitalReads = control.createBuffer(4);
            this.digitalWrites = control.createBuffer(4);
        }

        digitalWrite(pin: Pins, value: boolean) {
        }
    }

    //% fixedInstance whenUsed block="pin client"
    export const pinClient = new PinClient();

    export class PinInstance {
        index: Pins;
        constructor(index: Pins) {
            this.index = index;
        }

        digitalWrite(on: boolean) {
        }
    }

    export const pinD0 = new PinInstance(jacdac.Pins.D0);
}