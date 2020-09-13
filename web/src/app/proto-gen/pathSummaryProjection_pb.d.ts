// package: path.projection
// file: pathSummaryProjection.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";

export class PathSession extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathSession.AsObject;
  static toObject(includeInstance: boolean, msg: PathSession): PathSession.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PathSession, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathSession;
  static deserializeBinaryFromReader(message: PathSession, reader: jspb.BinaryReader): PathSession;
}

export namespace PathSession {
  export type AsObject = {
  }
}

export class PathSummaryProjectionEvent extends jspb.Message {
  hasCurrentstateevent(): boolean;
  clearCurrentstateevent(): void;
  getCurrentstateevent(): CurrentSummaryStateEvent | undefined;
  setCurrentstateevent(value?: CurrentSummaryStateEvent): void;

  hasPathcreatedevent(): boolean;
  clearPathcreatedevent(): void;
  getPathcreatedevent(): PathSummaryCreatedEvent | undefined;
  setPathcreatedevent(value?: PathSummaryCreatedEvent): void;

  hasPathrenamedevent(): boolean;
  clearPathrenamedevent(): void;
  getPathrenamedevent(): PathSummaryRenamedEvent | undefined;
  setPathrenamedevent(value?: PathSummaryRenamedEvent): void;

  hasPathremovedevent(): boolean;
  clearPathremovedevent(): void;
  getPathremovedevent(): PathSummaryRemovedEvent | undefined;
  setPathremovedevent(value?: PathSummaryRemovedEvent): void;

  getEventCase(): PathSummaryProjectionEvent.EventCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathSummaryProjectionEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PathSummaryProjectionEvent): PathSummaryProjectionEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PathSummaryProjectionEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathSummaryProjectionEvent;
  static deserializeBinaryFromReader(message: PathSummaryProjectionEvent, reader: jspb.BinaryReader): PathSummaryProjectionEvent;
}

export namespace PathSummaryProjectionEvent {
  export type AsObject = {
    currentstateevent?: CurrentSummaryStateEvent.AsObject,
    pathcreatedevent?: PathSummaryCreatedEvent.AsObject,
    pathrenamedevent?: PathSummaryRenamedEvent.AsObject,
    pathremovedevent?: PathSummaryRemovedEvent.AsObject,
  }

  export enum EventCase {
    EVENT_NOT_SET = 0,
    CURRENTSTATEEVENT = 1,
    PATHCREATEDEVENT = 2,
    PATHRENAMEDEVENT = 3,
    PATHREMOVEDEVENT = 4,
  }
}

export class PathSummaryCreatedEvent extends jspb.Message {
  hasPath(): boolean;
  clearPath(): void;
  getPath(): PathSummary | undefined;
  setPath(value?: PathSummary): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathSummaryCreatedEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PathSummaryCreatedEvent): PathSummaryCreatedEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PathSummaryCreatedEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathSummaryCreatedEvent;
  static deserializeBinaryFromReader(message: PathSummaryCreatedEvent, reader: jspb.BinaryReader): PathSummaryCreatedEvent;
}

export namespace PathSummaryCreatedEvent {
  export type AsObject = {
    path?: PathSummary.AsObject,
  }
}

export class PathSummaryRenamedEvent extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): common_pb.ProtoUUID | undefined;
  setId(value?: common_pb.ProtoUUID): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathSummaryRenamedEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PathSummaryRenamedEvent): PathSummaryRenamedEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PathSummaryRenamedEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathSummaryRenamedEvent;
  static deserializeBinaryFromReader(message: PathSummaryRenamedEvent, reader: jspb.BinaryReader): PathSummaryRenamedEvent;
}

export namespace PathSummaryRenamedEvent {
  export type AsObject = {
    id?: common_pb.ProtoUUID.AsObject,
    name: string,
  }
}

export class PathSummaryRemovedEvent extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): common_pb.ProtoUUID | undefined;
  setId(value?: common_pb.ProtoUUID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathSummaryRemovedEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PathSummaryRemovedEvent): PathSummaryRemovedEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PathSummaryRemovedEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathSummaryRemovedEvent;
  static deserializeBinaryFromReader(message: PathSummaryRemovedEvent, reader: jspb.BinaryReader): PathSummaryRemovedEvent;
}

export namespace PathSummaryRemovedEvent {
  export type AsObject = {
    id?: common_pb.ProtoUUID.AsObject,
  }
}

export class CurrentSummaryStateEvent extends jspb.Message {
  clearPathsList(): void;
  getPathsList(): Array<PathSummary>;
  setPathsList(value: Array<PathSummary>): void;
  addPaths(value?: PathSummary, index?: number): PathSummary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CurrentSummaryStateEvent.AsObject;
  static toObject(includeInstance: boolean, msg: CurrentSummaryStateEvent): CurrentSummaryStateEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CurrentSummaryStateEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CurrentSummaryStateEvent;
  static deserializeBinaryFromReader(message: CurrentSummaryStateEvent, reader: jspb.BinaryReader): CurrentSummaryStateEvent;
}

export namespace CurrentSummaryStateEvent {
  export type AsObject = {
    pathsList: Array<PathSummary.AsObject>,
  }
}

export class PathSummary extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): common_pb.ProtoUUID | undefined;
  setId(value?: common_pb.ProtoUUID): void;

  getName(): string;
  setName(value: string): void;

  hasTime(): boolean;
  clearTime(): void;
  getTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTime(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasDuration(): boolean;
  clearDuration(): void;
  getDuration(): google_protobuf_duration_pb.Duration | undefined;
  setDuration(value?: google_protobuf_duration_pb.Duration): void;

  getAveragespeed(): number;
  setAveragespeed(value: number): void;

  getMaxspeed(): number;
  setMaxspeed(value: number): void;

  getDistance(): number;
  setDistance(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathSummary.AsObject;
  static toObject(includeInstance: boolean, msg: PathSummary): PathSummary.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PathSummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathSummary;
  static deserializeBinaryFromReader(message: PathSummary, reader: jspb.BinaryReader): PathSummary;
}

export namespace PathSummary {
  export type AsObject = {
    id?: common_pb.ProtoUUID.AsObject,
    name: string,
    time?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    duration?: google_protobuf_duration_pb.Duration.AsObject,
    averagespeed: number,
    maxspeed: number,
    distance: number,
  }
}

