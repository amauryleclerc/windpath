import * as jspb from "google-protobuf"

export class GenericResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): GenericResponse;

  getMessage(): string;
  setMessage(value: string): GenericResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenericResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GenericResponse): GenericResponse.AsObject;
  static serializeBinaryToWriter(message: GenericResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenericResponse;
  static deserializeBinaryFromReader(message: GenericResponse, reader: jspb.BinaryReader): GenericResponse;
}

export namespace GenericResponse {
  export type AsObject = {
    success: boolean,
    message: string,
  }
}

export class ProtoUUID extends jspb.Message {
  getMostsigbits(): number;
  setMostsigbits(value: number): ProtoUUID;

  getLeastsigbits(): number;
  setLeastsigbits(value: number): ProtoUUID;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProtoUUID.AsObject;
  static toObject(includeInstance: boolean, msg: ProtoUUID): ProtoUUID.AsObject;
  static serializeBinaryToWriter(message: ProtoUUID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProtoUUID;
  static deserializeBinaryFromReader(message: ProtoUUID, reader: jspb.BinaryReader): ProtoUUID;
}

export namespace ProtoUUID {
  export type AsObject = {
    mostsigbits: number,
    leastsigbits: number,
  }
}

