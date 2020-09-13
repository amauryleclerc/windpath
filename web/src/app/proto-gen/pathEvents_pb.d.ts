// package: path.domain
// file: pathEvents.proto

import * as jspb from "google-protobuf";
import * as gpx_pb from "./gpx_pb";
import * as common_pb from "./common_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";

export class PathCreatedFromGpxEvent extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): common_pb.ProtoUUID | undefined;
  setId(value?: common_pb.ProtoUUID): void;

  hasTrack(): boolean;
  clearTrack(): void;
  getTrack(): gpx_pb.Track | undefined;
  setTrack(value?: gpx_pb.Track): void;

  hasTime(): boolean;
  clearTime(): void;
  getTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTime(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasBounds(): boolean;
  clearBounds(): void;
  getBounds(): gpx_pb.Bounds | undefined;
  setBounds(value?: gpx_pb.Bounds): void;

  hasMaxspeedpoint(): boolean;
  clearMaxspeedpoint(): void;
  getMaxspeedpoint(): gpx_pb.Point | undefined;
  setMaxspeedpoint(value?: gpx_pb.Point): void;

  hasDuration(): boolean;
  clearDuration(): void;
  getDuration(): google_protobuf_duration_pb.Duration | undefined;
  setDuration(value?: google_protobuf_duration_pb.Duration): void;

  getAveragespeed(): number;
  setAveragespeed(value: number): void;

  getDistance(): number;
  setDistance(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathCreatedFromGpxEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PathCreatedFromGpxEvent): PathCreatedFromGpxEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PathCreatedFromGpxEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathCreatedFromGpxEvent;
  static deserializeBinaryFromReader(message: PathCreatedFromGpxEvent, reader: jspb.BinaryReader): PathCreatedFromGpxEvent;
}

export namespace PathCreatedFromGpxEvent {
  export type AsObject = {
    id?: common_pb.ProtoUUID.AsObject,
    track?: gpx_pb.Track.AsObject,
    time?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    bounds?: gpx_pb.Bounds.AsObject,
    maxspeedpoint?: gpx_pb.Point.AsObject,
    duration?: google_protobuf_duration_pb.Duration.AsObject,
    averagespeed: number,
    distance: number,
  }
}

export class PathRenamedEvent extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): common_pb.ProtoUUID | undefined;
  setId(value?: common_pb.ProtoUUID): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathRenamedEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PathRenamedEvent): PathRenamedEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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

export class PathRemovedEvent extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): common_pb.ProtoUUID | undefined;
  setId(value?: common_pb.ProtoUUID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathRemovedEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PathRemovedEvent): PathRemovedEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PathRemovedEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathRemovedEvent;
  static deserializeBinaryFromReader(message: PathRemovedEvent, reader: jspb.BinaryReader): PathRemovedEvent;
}

export namespace PathRemovedEvent {
  export type AsObject = {
    id?: common_pb.ProtoUUID.AsObject,
  }
}

