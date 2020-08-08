import * as jspb from "google-protobuf"

import * as common_pb from './common_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class GpxXmlWrapper extends jspb.Message {
  getGpx(): Uint8Array | string;
  getGpx_asU8(): Uint8Array;
  getGpx_asB64(): string;
  setGpx(value: Uint8Array | string): GpxXmlWrapper;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GpxXmlWrapper.AsObject;
  static toObject(includeInstance: boolean, msg: GpxXmlWrapper): GpxXmlWrapper.AsObject;
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
  getTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTime(value?: google_protobuf_timestamp_pb.Timestamp): Gpx;
  hasTime(): boolean;
  clearTime(): Gpx;

  getBounds(): Bounds | undefined;
  setBounds(value?: Bounds): Gpx;
  hasBounds(): boolean;
  clearBounds(): Gpx;

  getTracksList(): Array<Track>;
  setTracksList(value: Array<Track>): Gpx;
  clearTracksList(): Gpx;
  addTracks(value?: Track, index?: number): Track;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Gpx.AsObject;
  static toObject(includeInstance: boolean, msg: Gpx): Gpx.AsObject;
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
  setMinlat(value: number): Bounds;

  getMinlon(): number;
  setMinlon(value: number): Bounds;

  getMaxlat(): number;
  setMaxlat(value: number): Bounds;

  getMaxlon(): number;
  setMaxlon(value: number): Bounds;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Bounds.AsObject;
  static toObject(includeInstance: boolean, msg: Bounds): Bounds.AsObject;
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
  setLat(value: number): Point;

  getLon(): number;
  setLon(value: number): Point;

  getEle(): number;
  setEle(value: number): Point;

  getTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTime(value?: google_protobuf_timestamp_pb.Timestamp): Point;
  hasTime(): boolean;
  clearTime(): Point;

  getSpeed(): number;
  setSpeed(value: number): Point;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Point.AsObject;
  static toObject(includeInstance: boolean, msg: Point): Point.AsObject;
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
  getPointsList(): Array<Point>;
  setPointsList(value: Array<Point>): Segment;
  clearPointsList(): Segment;
  addPoints(value?: Point, index?: number): Point;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Segment.AsObject;
  static toObject(includeInstance: boolean, msg: Segment): Segment.AsObject;
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
  setName(value: string): Track;

  getSegmentsList(): Array<Segment>;
  setSegmentsList(value: Array<Segment>): Track;
  clearSegmentsList(): Track;
  addSegments(value?: Segment, index?: number): Segment;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Track.AsObject;
  static toObject(includeInstance: boolean, msg: Track): Track.AsObject;
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

