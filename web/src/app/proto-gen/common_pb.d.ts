// package: path.common
// file: common.proto

import * as jspb from "google-protobuf";

export class GenericResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenericResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GenericResponse): GenericResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
  getMostsigbits(): string;
  setMostsigbits(value: string): void;

  getLeastsigbits(): string;
  setLeastsigbits(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProtoUUID.AsObject;
  static toObject(includeInstance: boolean, msg: ProtoUUID): ProtoUUID.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProtoUUID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProtoUUID;
  static deserializeBinaryFromReader(message: ProtoUUID, reader: jspb.BinaryReader): ProtoUUID;
}

export namespace ProtoUUID {
  export type AsObject = {
    mostsigbits: string,
    leastsigbits: string,
  }
}

