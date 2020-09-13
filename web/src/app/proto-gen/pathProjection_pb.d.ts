// package: path.projection
// file: pathProjection.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";

export class Path extends jspb.Message {
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

  clearSegmentsList(): void;
  getSegmentsList(): Array<PathSegment>;
  setSegmentsList(value: Array<PathSegment>): void;
  addSegments(value?: PathSegment, index?: number): PathSegment;

  hasMaxspeedpositon(): boolean;
  clearMaxspeedpositon(): void;
  getMaxspeedpositon(): Position | undefined;
  setMaxspeedpositon(value?: Position): void;

  hasDuration(): boolean;
  clearDuration(): void;
  getDuration(): google_protobuf_duration_pb.Duration | undefined;
  setDuration(value?: google_protobuf_duration_pb.Duration): void;

  getAveragespeed(): number;
  setAveragespeed(value: number): void;

  getDistance(): number;
  setDistance(value: number): void;

  hasBounds(): boolean;
  clearBounds(): void;
  getBounds(): Bounds | undefined;
  setBounds(value?: Bounds): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Path.AsObject;
  static toObject(includeInstance: boolean, msg: Path): Path.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Path, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Path;
  static deserializeBinaryFromReader(message: Path, reader: jspb.BinaryReader): Path;
}

export namespace Path {
  export type AsObject = {
    id?: common_pb.ProtoUUID.AsObject,
    name: string,
    time?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    segmentsList: Array<PathSegment.AsObject>,
    maxspeedpositon?: Position.AsObject,
    duration?: google_protobuf_duration_pb.Duration.AsObject,
    averagespeed: number,
    distance: number,
    bounds?: Bounds.AsObject,
  }
}

export class Bounds extends jspb.Message {
  hasCornera(): boolean;
  clearCornera(): void;
  getCornera(): Position | undefined;
  setCornera(value?: Position): void;

  hasCornerb(): boolean;
  clearCornerb(): void;
  getCornerb(): Position | undefined;
  setCornerb(value?: Position): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Bounds.AsObject;
  static toObject(includeInstance: boolean, msg: Bounds): Bounds.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Bounds, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Bounds;
  static deserializeBinaryFromReader(message: Bounds, reader: jspb.BinaryReader): Bounds;
}

export namespace Bounds {
  export type AsObject = {
    cornera?: Position.AsObject,
    cornerb?: Position.AsObject,
  }
}

export class PathSegment extends jspb.Message {
  hasPointa(): boolean;
  clearPointa(): void;
  getPointa(): Position | undefined;
  setPointa(value?: Position): void;

  hasPointb(): boolean;
  clearPointb(): void;
  getPointb(): Position | undefined;
  setPointb(value?: Position): void;

  getSpeed(): number;
  setSpeed(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathSegment.AsObject;
  static toObject(includeInstance: boolean, msg: PathSegment): PathSegment.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PathSegment, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathSegment;
  static deserializeBinaryFromReader(message: PathSegment, reader: jspb.BinaryReader): PathSegment;
}

export namespace PathSegment {
  export type AsObject = {
    pointa?: Position.AsObject,
    pointb?: Position.AsObject,
    speed: number,
  }
}

export class Position extends jspb.Message {
  getLat(): number;
  setLat(value: number): void;

  getLon(): number;
  setLon(value: number): void;

  getSpeed(): number;
  setSpeed(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Position.AsObject;
  static toObject(includeInstance: boolean, msg: Position): Position.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Position, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Position;
  static deserializeBinaryFromReader(message: Position, reader: jspb.BinaryReader): Position;
}

export namespace Position {
  export type AsObject = {
    lat: number,
    lon: number,
    speed: number,
  }
}

