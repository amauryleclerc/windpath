import { ProtoUUID } from '../proto-gen/common_pb';

export class UUIDUtil {

    public static toString(id: ProtoUUID): string {
        const byteToHex = [];
        for (let i = 0; i < 256; ++i) {
            byteToHex.push((i + 0x100).toString(16).substr(1));
        }
        const most = this.longToByteArray(id.getMostsigbits());
        const less = this.longToByteArray(id.getLeastsigbits());
        const result = (byteToHex[most[0]]
            + byteToHex[most[1]]
            + byteToHex[most[2]]
            + byteToHex[most[3]]
            + '-'
            + byteToHex[most[4]]
            + byteToHex[most[5]]
            + '-'
            + byteToHex[most[6]]
            + byteToHex[most[7]]
            + '-' 
            + byteToHex[less[0]]
            + byteToHex[less[1]]
            + '-' 
            + byteToHex[less[2]]
            + byteToHex[less[3]]
            + byteToHex[less[4]]
            + byteToHex[less[5]]
            + byteToHex[less[6]]
            + byteToHex[less[7]]
        ).toLowerCase();
        return result;
    }

    public static toProtoUUID(uuid: string): ProtoUUID {
        let v;
        const most = new Uint8Array(8);
        const less = new Uint8Array(8);

        most[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
        most[1] = v >>> 16 & 0xff;
        most[2] = v >>> 8 & 0xff;
        most[3] = v & 0xff;

        most[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
        most[5] = v & 0xff;

        most[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
        most[7] = v & 0xff;


        less[0] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
        less[1] = v & 0xff;

        less[2] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
        less[3] = v / 0x100000000 & 0xff;
        less[4] = v >>> 24 & 0xff;
        less[5] = v >>> 16 & 0xff;
        less[6] = v >>> 8 & 0xff;
        less[7] = v & 0xff;
        const id = new ProtoUUID();
        id.setMostsigbits(this.byteArrayToLong(most));
        id.setLeastsigbits(this.byteArrayToLong(less));


        return id;
    }

    private static longToByteArray(long: string): Uint8Array {
        const buffer = new ArrayBuffer(8);
        const arr = new Uint8Array(buffer, 0, 8);
        const view1 = new DataView(buffer);
        const b = BigInt(long);
        view1.setBigUint64(0, b);
        return arr;
    }

    private static byteArrayToLong(byteArray: Uint8Array): string {
        const view = new DataView(byteArray.buffer);
        const result: BigInt = view.getBigUint64(0);
        return String(result);
    }


}
