import * as jspb from "google-protobuf"

import * as pathcommands_pb from './pathcommands_pb';

export class PathSession extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathSession.AsObject;
  static toObject(includeInstance: boolean, msg: PathSession): PathSession.AsObject;
  static serializeBinaryToWriter(message: PathSession, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathSession;
  static deserializeBinaryFromReader(message: PathSession, reader: jspb.BinaryReader): PathSession;
}

export namespace PathSession {
  export type AsObject = {
  }
}

export class PathEvent extends jspb.Message {
  getId(): pathcommands_pb.ProtoUUID | undefined;
  setId(value?: pathcommands_pb.ProtoUUID): PathEvent;
  hasId(): boolean;
  clearId(): PathEvent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PathEvent): PathEvent.AsObject;
  static serializeBinaryToWriter(message: PathEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathEvent;
  static deserializeBinaryFromReader(message: PathEvent, reader: jspb.BinaryReader): PathEvent;
}

export namespace PathEvent {
  export type AsObject = {
    id?: pathcommands_pb.ProtoUUID.AsObject,
  }
}

