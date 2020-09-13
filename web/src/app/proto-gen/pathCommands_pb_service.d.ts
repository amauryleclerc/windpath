// package: path.domain
// file: pathCommands.proto

import * as pathCommands_pb from "./pathCommands_pb";
import * as common_pb from "./common_pb";
import {grpc} from "@improbable-eng/grpc-web";

type Pathapply = {
  readonly methodName: string;
  readonly service: typeof Path;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof pathCommands_pb.PathCommand;
  readonly responseType: typeof common_pb.GenericResponse;
};

export class Path {
  static readonly serviceName: string;
  static readonly apply: Pathapply;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class PathClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  apply(
    requestMessage: pathCommands_pb.PathCommand,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: common_pb.GenericResponse|null) => void
  ): UnaryResponse;
  apply(
    requestMessage: pathCommands_pb.PathCommand,
    callback: (error: ServiceError|null, responseMessage: common_pb.GenericResponse|null) => void
  ): UnaryResponse;
}

