import * as jspb from "google-protobuf"

import * as common_pb from './common_pb';
import * as gpx_pb from './gpx_pb';

export class PathCommand extends jspb.Message {
  getId(): common_pb.ProtoUUID | undefined;
  setId(value?: common_pb.ProtoUUID): PathCommand;
  hasId(): boolean;
  clearId(): PathCommand;

  getCreatepathfromgpxcommand(): CreatePathFromGpxCommand | undefined;
  setCreatepathfromgpxcommand(value?: CreatePathFromGpxCommand): PathCommand;
  hasCreatepathfromgpxcommand(): boolean;
  clearCreatepathfromgpxcommand(): PathCommand;

  getRenamepathcommand(): RenamePathCommand | undefined;
  setRenamepathcommand(value?: RenamePathCommand): PathCommand;
  hasRenamepathcommand(): boolean;
  clearRenamepathcommand(): PathCommand;

  getCommandCase(): PathCommand.CommandCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathCommand.AsObject;
  static toObject(includeInstance: boolean, msg: PathCommand): PathCommand.AsObject;
  static serializeBinaryToWriter(message: PathCommand, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathCommand;
  static deserializeBinaryFromReader(message: PathCommand, reader: jspb.BinaryReader): PathCommand;
}

export namespace PathCommand {
  export type AsObject = {
    id?: common_pb.ProtoUUID.AsObject,
    createpathfromgpxcommand?: CreatePathFromGpxCommand.AsObject,
    renamepathcommand?: RenamePathCommand.AsObject,
  }

  export enum CommandCase { 
    COMMAND_NOT_SET = 0,
    CREATEPATHFROMGPXCOMMAND = 2,
    RENAMEPATHCOMMAND = 3,
  }
}

export class CreatePathFromGpxCommand extends jspb.Message {
  getGpx(): gpx_pb.Gpx | undefined;
  setGpx(value?: gpx_pb.Gpx): CreatePathFromGpxCommand;
  hasGpx(): boolean;
  clearGpx(): CreatePathFromGpxCommand;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreatePathFromGpxCommand.AsObject;
  static toObject(includeInstance: boolean, msg: CreatePathFromGpxCommand): CreatePathFromGpxCommand.AsObject;
  static serializeBinaryToWriter(message: CreatePathFromGpxCommand, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreatePathFromGpxCommand;
  static deserializeBinaryFromReader(message: CreatePathFromGpxCommand, reader: jspb.BinaryReader): CreatePathFromGpxCommand;
}

export namespace CreatePathFromGpxCommand {
  export type AsObject = {
    gpx?: gpx_pb.Gpx.AsObject,
  }
}

export class RenamePathCommand extends jspb.Message {
  getName(): string;
  setName(value: string): RenamePathCommand;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RenamePathCommand.AsObject;
  static toObject(includeInstance: boolean, msg: RenamePathCommand): RenamePathCommand.AsObject;
  static serializeBinaryToWriter(message: RenamePathCommand, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RenamePathCommand;
  static deserializeBinaryFromReader(message: RenamePathCommand, reader: jspb.BinaryReader): RenamePathCommand;
}

export namespace RenamePathCommand {
  export type AsObject = {
    name: string,
  }
}

export class PathCreatedFromGpxEvent extends jspb.Message {
  getId(): common_pb.ProtoUUID | undefined;
  setId(value?: common_pb.ProtoUUID): PathCreatedFromGpxEvent;
  hasId(): boolean;
  clearId(): PathCreatedFromGpxEvent;

  getName(): string;
  setName(value: string): PathCreatedFromGpxEvent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PathCreatedFromGpxEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PathCreatedFromGpxEvent): PathCreatedFromGpxEvent.AsObject;
  static serializeBinaryToWriter(message: PathCreatedFromGpxEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PathCreatedFromGpxEvent;
  static deserializeBinaryFromReader(message: PathCreatedFromGpxEvent, reader: jspb.BinaryReader): PathCreatedFromGpxEvent;
}

export namespace PathCreatedFromGpxEvent {
  export type AsObject = {
    id?: common_pb.ProtoUUID.AsObject,
    name: string,
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

