// package: path.domain
// file: pathCommands.proto

import * as jspb from "google-protobuf";
import * as common_pb from "./common_pb";
import * as gpx_pb from "./gpx_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class PathCommand extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): common_pb.ProtoUUID | undefined;
  setId(value?: common_pb.ProtoUUID): void;

  hasCreatepathfromgpxcommand(): boolean;
  clearCreatepathfromgpxcommand(): void;
  getCreatepathfromgpxcommand(): CreatePathFromGpxCommand | undefined;
  setCreatepathfromgpxcommand(value?: CreatePathFromGpxCommand): void;

  hasRenamepathcommand(): boolean;
  clearRenamepathcommand(): void;
  getRenamepathcommand(): RenamePathCommand | undefined;
  setRenamepathcommand(value?: RenamePathCommand): void;

  hasRemovepathcommand(): boolean;
  clearRemovepathcommand(): void;
  getRemovepathcommand(): RemovePathCommand | undefined;
  setRemovepathcommand(value?: RemovePathCommand): void;

  getCommandCase(): PathCommand.CommandCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathCommand.AsObject;
  static toObject(includeInstance: boolean, msg: PathCommand): PathCommand.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PathCommand, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathCommand;
  static deserializeBinaryFromReader(message: PathCommand, reader: jspb.BinaryReader): PathCommand;
}

export namespace PathCommand {
  export type AsObject = {
    id?: common_pb.ProtoUUID.AsObject,
    createpathfromgpxcommand?: CreatePathFromGpxCommand.AsObject,
    renamepathcommand?: RenamePathCommand.AsObject,
    removepathcommand?: RemovePathCommand.AsObject,
  }

  export enum CommandCase {
    COMMAND_NOT_SET = 0,
    CREATEPATHFROMGPXCOMMAND = 2,
    RENAMEPATHCOMMAND = 3,
    REMOVEPATHCOMMAND = 4,
  }
}

export class CreatePathFromGpxCommand extends jspb.Message {
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

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreatePathFromGpxCommand.AsObject;
  static toObject(includeInstance: boolean, msg: CreatePathFromGpxCommand): CreatePathFromGpxCommand.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreatePathFromGpxCommand, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreatePathFromGpxCommand;
  static deserializeBinaryFromReader(message: CreatePathFromGpxCommand, reader: jspb.BinaryReader): CreatePathFromGpxCommand;
}

export namespace CreatePathFromGpxCommand {
  export type AsObject = {
    track?: gpx_pb.Track.AsObject,
    time?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    bounds?: gpx_pb.Bounds.AsObject,
  }
}

export class RenamePathCommand extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RenamePathCommand.AsObject;
  static toObject(includeInstance: boolean, msg: RenamePathCommand): RenamePathCommand.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RenamePathCommand, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RenamePathCommand;
  static deserializeBinaryFromReader(message: RenamePathCommand, reader: jspb.BinaryReader): RenamePathCommand;
}

export namespace RenamePathCommand {
  export type AsObject = {
    name: string,
  }
}

export class RemovePathCommand extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemovePathCommand.AsObject;
  static toObject(includeInstance: boolean, msg: RemovePathCommand): RemovePathCommand.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RemovePathCommand, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemovePathCommand;
  static deserializeBinaryFromReader(message: RemovePathCommand, reader: jspb.BinaryReader): RemovePathCommand;
}

export namespace RemovePathCommand {
  export type AsObject = {
  }
}

