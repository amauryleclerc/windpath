// package: path.gpx
// file: gpx.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class GpxXmlWrapper extends jspb.Message {
  getGpx(): Uint8Array | string;
  getGpx_asU8(): Uint8Array;
  getGpx_asB64(): string;
  setGpx(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GpxXmlWrapper.AsObject;
  static toObject(includeInstance: boolean, msg: GpxXmlWrapper): GpxXmlWrapper.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GpxXmlWrapper, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GpxXmlWrapper;
  static deserializeBinaryFromReader(message: GpxXmlWrapper, reader: jspb.BinaryReader): GpxXmlWrapper;
}

export namespace GpxXmlWrapper {
  export type AsObject = {
    gpx: Uint8Array | string,
  }
}

export class Gpx extends jspb.Message {
  hasTime(): boolean;
  clearTime(): void;
  getTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTime(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasBounds(): boolean;
  clearBounds(): void;
  getBounds(): Bounds | undefined;
  setBounds(value?: Bounds): void;

  clearTracksList(): void;
  getTracksList(): Array<Track>;
  setTracksList(value: Array<Track>): void;
  addTracks(value?: Track, index?: number): Track;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Gpx.AsObject;
  static toObject(includeInstance: boolean, msg: Gpx): Gpx.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Gpx, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Gpx;
  static deserializeBinaryFromReader(message: Gpx, reader: jspb.BinaryReader): Gpx;
}

export namespace Gpx {
  export type AsObject = {
    time?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    bounds?: Bounds.AsObject,
    tracksList: Array<Track.AsObject>,
  }
}

export class Bounds extends jspb.Message {
  getMinlat(): number;
  setMinlat(value: number): void;

  getMinlon(): number;
  setMinlon(value: number): void;

  getMaxlat(): number;
  setMaxlat(value: number): void;

  getMaxlon(): number;
  setMaxlon(value: number): void;

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
    minlat: number,
    minlon: number,
    maxlat: number,
    maxlon: number,
  }
}

export class Point extends jspb.Message {
  getLat(): number;
  setLat(value: number): void;

  getLon(): number;
  setLon(value: number): void;

  getEle(): number;
  setEle(value: number): void;

  hasTime(): boolean;
  clearTime(): void;
  getTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTime(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getSpeed(): number;
  setSpeed(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Point.AsObject;
  static toObject(includeInstance: boolean, msg: Point): Point.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Point, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Point;
  static deserializeBinaryFromReader(message: Point, reader: jspb.BinaryReader): Point;
}

export namespace Point {
  export type AsObject = {
    lat: number,
    lon: number,
    ele: number,
    time?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    speed: number,
  }
}

export class Segment extends jspb.Message {
  clearPointsList(): void;
  getPointsList(): Array<Point>;
  setPointsList(value: Array<Point>): void;
  addPoints(value?: Point, index?: number): Point;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Segment.AsObject;
  static toObject(includeInstance: boolean, msg: Segment): Segment.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Segment, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Segment;
  static deserializeBinaryFromReader(message: Segment, reader: jspb.BinaryReader): Segment;
}

export namespace Segment {
  export type AsObject = {
    pointsList: Array<Point.AsObject>,
  }
}

export class Track extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  clearSegmentsList(): void;
  getSegmentsList(): Array<Segment>;
  setSegmentsList(value: Array<Segment>): void;
  addSegments(value?: Segment, index?: number): Segment;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Track.AsObject;
  static toObject(includeInstance: boolean, msg: Track): Track.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Track, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Track;
  static deserializeBinaryFromReader(message: Track, reader: jspb.BinaryReader): Track;
}

export namespace Track {
  export type AsObject = {
    name: string,
    segmentsList: Array<Segment.AsObject>,
  }
}

