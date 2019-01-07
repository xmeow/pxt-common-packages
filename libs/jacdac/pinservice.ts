namespace jacdac {
    const enum PinCommand {
        None,
        DigitalRead,
        DigitalWrite,
        AnalogRead,
        AnalogWrite
    }

    export const PIN_CFGS = [
        DAL.CFG_PIN_D0,
        DAL.CFG_PIN_D1,
        DAL.CFG_PIN_D2,
        DAL.CFG_PIN_D3,
        DAL.CFG_PIN_D4,
        DAL.CFG_PIN_D5,
        DAL.CFG_PIN_D6,
        DAL.CFG_PIN_D7,
        DAL.CFG_PIN_D8,
        DAL.CFG_PIN_D9,
        DAL.CFG_PIN_D10,
        DAL.CFG_PIN_D11,
        DAL.CFG_PIN_D12,
        DAL.CFG_PIN_D13,
        DAL.CFG_PIN_D14,
        DAL.CFG_PIN_D15,
        DAL.CFG_PIN_A0,
        DAL.CFG_PIN_A1,
        DAL.CFG_PIN_A2,
        DAL.CFG_PIN_A3,
        DAL.CFG_PIN_A4,
        DAL.CFG_PIN_A5,
        DAL.CFG_PIN_A6,
        DAL.CFG_PIN_A7,
        DAL.CFG_PIN_A8,
        DAL.CFG_PIN_A9,
        DAL.CFG_PIN_A10,
        DAL.CFG_PIN_A11,
        DAL.CFG_PIN_A12,
        DAL.CFG_PIN_A13,
        DAL.CFG_PIN_A14,
        DAL.CFG_PIN_A15
    ];

    //% fixedInstances
    export class PinService extends Service {
        constructor() {
            super("io", jacdac.IO_DEVICE_CLASS, 0);
        }

        handlePacket(pkt: Buffer): boolean {
            const packet = new JDPacket(pkt);
            const data = packet.data;
            const cmd = data[0];
            const pins = data.getNumber(NumberFormat.UInt32LE, 1);
            switch (cmd) {
                case PinCommand.DigitalRead:
                    return this.handleDigitalRead(pins);
                case PinCommand.DigitalWrite:
                    return this.handleDigitalWrite(pins, data[5]);
                case PinCommand.AnalogRead:
                    return this.handleAnalogRead(pins);
                case PinCommand.AnalogWrite:
                    return this.handleAnalogWrite(pins, data.slice(5));
                default: // unknown
                    return true;
            }
        }

        private handleDigitalWrite(pins: number, states: number): boolean {
            for (let i = 0; i < PIN_CFGS.length; ++i) {
                const mask = 1 << i;
                if (pins & mask) {
                    const on = !!(states & mask);
                    const pin = pxt.getPinCfg(PIN_CFGS[i]);
                    pin.digitalWrite(on);
                }
            }
            return true;
        }

        private handleDigitalRead(pins: number): boolean {
            const pkt = this.createPinPacket(PinCommand.DigitalRead, pins, 1);
            for (let i = 0; i < PIN_CFGS.length; ++i) {
                const mask = 1 << i;
                if (pins & mask) {
                    const pin = pxt.getPinCfg(PIN_CFGS[i]);
                    const on = pin.digitalRead();
                    if (on)
                        pkt[5] = pkt[5] | mask;
                }
            }
            this.sendPacket(pkt);
            return true;
        }

        private handleAnalogWrite(pins: number, states: Buffer): boolean {
            let k = 0;
            for (let i = 0; i < PIN_CFGS.length && k + 1 < states.length; ++i) {
                const mask = 1 << i;
                if (pins & mask) {
                    const pin = pxt.getPinCfg(PIN_CFGS[i]);
                    pin.analogWrite(states.getNumber(NumberFormat.UInt16LE, k));
                    k += 2;
                }
            }
            return true;
        }

        private handleAnalogRead(pins: number): boolean {
            // count pins
            let n = 0;
            for (let i = 0; i < PIN_CFGS.length; ++i) {
                const mask = 1 << i;
                if (pins & mask) n++;
            }

            if (n > 7) {
                this.log("too many analog reads, max 7")
                n = 7;
            }

            const pkt = this.createPinPacket(PinCommand.DigitalRead, pins, n);
            let k = 0;
            for (let i = 0; i < PIN_CFGS.length && k + 1 < n; ++i) {
                const mask = 1 << i;
                if (pins & mask) {
                    const pin = pxt.getPinCfg(PIN_CFGS[i]);
                    const value = pin.AnalogRead();
                    pkt.setNumber(NumberFormat.UInt16LE, 5 + k, value);
                    k += 2;
                }
            }

            this.sendPacket(pkt);
            return true;
        }

        private createPinPacket(cmd: PinCommand, pins: number, dataLength: number): Buffer {
            const pkt = control.createBuffer(5 + dataLength);
            pkt[0] = cmd;
            pkt.setNumber(NumberFormat.UInt32LE, 1, pins);
            return pkt;
        }
    }

    //% fixedInstance whenUsed block="pin service"
    export const pinService = new PinService();
}