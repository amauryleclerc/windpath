import * as jspb from "google-protobuf"

import * as common_pb from './common_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

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

export class PathSummaryProjectionEvent extends jspb.Message {
  getCurrentstateevent(): CurrentStateEvent | undefined;
  setCurrentstateevent(value?: CurrentStateEvent): PathSummaryProjectionEvent;
  hasCurrentstateevent(): boolean;
  clearCurrentstateevent(): PathSummaryProjectionEvent;

  getPathcreatedevent(): PathCreatedEvent | undefined;
  setPathcreatedevent(value?: PathCreatedEvent): PathSummaryProjectionEvent;
  hasPathcreatedevent(): boolean;
  clearPathcreatedevent(): PathSummaryProjectionEvent;

  getPathrenamedevent(): PathRenamedEvent | undefined;
  setPathrenamedevent(value?: PathRenamedEvent): PathSummaryProjectionEvent;
  hasPathrenamedevent(): boolean;
  clearPathrenamedevent(): PathSummaryProjectionEvent;

  getEventCase(): PathSummaryProjectionEvent.EventCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathSummaryProjectionEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PathSummaryProjectionEvent): PathSummaryProjectionEvent.AsObject;
  static serializeBinaryToWriter(message: PathSummaryProjectionEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathSummaryProjectionEvent;
  static deserializeBinaryFromReader(message: PathSummaryProjectionEvent, reader: jspb.BinaryReader): PathSummaryProjectionEvent;
}

export namespace PathSummaryProjectionEvent {
  export type AsObject = {
    currentstateevent?: CurrentStateEvent.AsObject,
    pathcreatedevent?: PathCreatedEvent.AsObject,
    pathrenamedevent?: PathRenamedEvent.AsObject,
  }

  export enum EventCase { 
    EVENT_NOT_SET = 0,
    CURRENTSTATEEVENT = 1,
    PATHCREATEDEVENT = 2,
    PATHRENAMEDEVENT = 3,
  }
}

export class PathCreatedEvent extends jspb.Message {
  getPath(): PathSummary | undefined;
  setPath(value?: PathSummary): PathCreatedEvent;
  hasPath(): boolean;
  clearPath(): PathCreatedEvent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathCreatedEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PathCreatedEvent): PathCreatedEvent.AsObject;
  static serializeBinaryToWriter(message: PathCreatedEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathCreatedEvent;
  static deserializeBinaryFromReader(message: PathCreatedEvent, reader: jspb.BinaryReader): PathCreatedEvent;
}

export namespace PathCreatedEvent {
  export type AsObject = {
    path?: PathSummary.AsObject,
  }
}

export class PathRenamedEvent extends jspb.Message {
  getId(): common_pb.ProtoUUID | undefined;
  setId(value?: common_pb.ProtoUUID): PathRenamedEvent;
  hasId(): boolean;
  clearId(): PathRenamedEvent;

  getName(): string;
  setName(value: string): PathRenamedEvent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathRenamedEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PathRenamedEvent): PathRenamedEvent.AsObject;
  static serializeBinaryToWriter(message: PathRenamedEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathRenamedEvent;
  static deserializeBinaryFromReader(message: PathRenamedEvent, reader: jspb.BinaryReader): PathRenamedEvent;
}

export namespace PathRenamedEvent {
  export type AsObject = {
    id?: common_pb.ProtoUUID.AsObject,
    name: string,
  }
}

export class CurrentStateEvent extends jspb.Message {
  getPathsList(): Array<PathSummary>;
  setPathsList(value: Array<PathSummary>): CurrentStateEvent;
  clearPathsList(): CurrentStateEvent;
  addPaths(value?: PathSummary, index?: number): PathSummary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CurrentStateEvent.AsObject;
  static toObject(includeInstance: boolean, msg: CurrentStateEvent): CurrentStateEvent.AsObject;
  static serializeBinaryToWriter(message: CurrentStateEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CurrentStateEvent;
  static deserializeBinaryFromReader(message: CurrentStateEvent, reader: jspb.BinaryReader): CurrentStateEvent;
}

export namespace CurrentStateEvent {
  export type AsObject = {
    pathsList: Array<PathSummary.AsObject>,
  }
}

export class PathSummary extends jspb.Message {
  getId(): common_pb.ProtoUUID | undefined;
  setId(value?: common_pb.ProtoUUID): PathSummary;
  hasId(): boolean;
  clearId(): PathSummary;

  getName(): string;
  setName(value: string): PathSummary;

  getTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTime(value?: google_protobuf_timestamp_pb.Timestamp): PathSummary;
  hasTime(): boolean;
  clearTime(): PathSummary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathSummary.AsObject;
  static toObject(includeInstance: boolean, msg: PathSummary): PathSummary.AsObject;
  static serializeBinaryToWriter(message: PathSummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathSummary;
  static deserializeBinaryFromReader(message: PathSummary, reader: jspb.BinaryReader): PathSummary;
}

export namespace PathSummary {
  export type AsObject = {
    id?: common_pb.ProtoUUID.AsObject,
    name: string,
    time?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

