namespace jacdac {
    //% fixedInstances
    export class PinClient extends Client {
        digitalState: Buffer;

        constructor() {
            super("io", jacdac.IO_DEVICE_CLASS);
            this.digitalState = control.createBuffer(16);
        }

        get digitalReadPins(): number {
            return this.digitalState.getNumber(NumberFormat.UInt32LE, 0);
        }

        set digitalReadPins(value: number) {
            this.digitalState.setNumber(NumberFormat.UInt32LE, 0, value);
        }

        get digitalReads(): number {
            return this.digitalState.getNumber(NumberFormat.UInt32LE, 4);
        }

        set digitalReads(value: number) {
            this.digitalState.setNumber(NumberFormat.UInt32LE, 4, value);
        }

        get digitalWritePins(): number {
            return this.digitalState.getNumber(NumberFormat.UInt32LE, 8);
        }

        set digitalWritePins(value: number) {
            this.digitalState.setNumber(NumberFormat.UInt32LE, 8, value);
        }

        get digitalWrites(): number {
            return this.digitalState.getNumber(NumberFormat.UInt32LE, 12);
        }

        set digitalWrites(value: number) {
            this.digitalState.setNumber(NumberFormat.UInt32LE, 12, value);
        }

        digitalWriteBulk(pinSet: Pins, value: boolean) {
            this.digitalWritePins |= pinSet;
            this.digitalReadPins = ~(this.digitalReadPins | pinSet);
            if(value)
                this.digitalWrites |= pinSet;
            else
                this.digitalWrites = ~(~this.digitalWrites | pinSet);
        }

        digitalReadBulk(pinSet: Pins): number {
            this.digitalReadPins |= pinSet;
            this.digitalWritePins = ~(this.digitalWritePins | pinSet);
            return this.digitalReads & pinSet;
        }

        clearBulk(pinSet: Pins) {
            this.digitalWritePins = ~(this.digitalWritePins | pinSet);
            this.digitalReadPins = ~(this.digitalReadPins | pinSet);
        }
    }

    //% fixedInstance whenUsed block="pin client"
    export const pinClient = new PinClient();

    export class PinInstance {
        index: Pins;
        constructor(index: Pins) {
            this.index = index;
        }

        /**
         * Writes the status of the pin, which will be sent via jacdac
         * @param on 
         */
        digitalWrite(on: boolean) {
            pinClient.digitalWriteBulk(this.index, on);
        }

        /**
         * Reads the last state of the pin
         */
        digitalRead(): boolean {
            return !!pinClient.digitalReadBulk(this.index);
        }
    }

    //% fixedInstance whenUsed block="pin D0"
    export const pinD0 = new PinInstance(jacdac.Pins.D0);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD1 = new PinInstance(jacdac.Pins.D1);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD2 = new PinInstance(jacdac.Pins.D2);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD3 = new PinInstance(jacdac.Pins.D3);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD4 = new PinInstance(jacdac.Pins.D4);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD5 = new PinInstance(jacdac.Pins.D5);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD6 = new PinInstance(jacdac.Pins.D6);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD7 = new PinInstance(jacdac.Pins.D7);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD8 = new PinInstance(jacdac.Pins.D8);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD9 = new PinInstance(jacdac.Pins.D9);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD10 = new PinInstance(jacdac.Pins.D10);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD11 = new PinInstance(jacdac.Pins.D11);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD12 = new PinInstance(jacdac.Pins.D12);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD13 = new PinInstance(jacdac.Pins.D13);
    //% fixedInstance whenUsed block="pin D0"
    export const pinD14 = new PinInstance(jacdac.Pins.D14);

    //% fixedInstance whenUsed block="pin D0"
    export const pinA0 = new PinInstance(jacdac.Pins.A0);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA1 = new PinInstance(jacdac.Pins.A1);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA2 = new PinInstance(jacdac.Pins.A2);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA3 = new PinInstance(jacdac.Pins.A3);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA4 = new PinInstance(jacdac.Pins.A4);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA5 = new PinInstance(jacdac.Pins.A5);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA6 = new PinInstance(jacdac.Pins.A6);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA7 = new PinInstance(jacdac.Pins.A7);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA8 = new PinInstance(jacdac.Pins.A8);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA9 = new PinInstance(jacdac.Pins.A9);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA10 = new PinInstance(jacdac.Pins.A10);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA11 = new PinInstance(jacdac.Pins.A11);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA12 = new PinInstance(jacdac.Pins.A12);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA13 = new PinInstance(jacdac.Pins.A13);
    //% fixedInstance whenUsed block="pin D0"
    export const pinA14 = new PinInstance(jacdac.Pins.A14);
}