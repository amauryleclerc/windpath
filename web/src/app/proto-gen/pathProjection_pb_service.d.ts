// package: path.projection
// file: pathProjection.proto

import * as pathProjection_pb from "./pathProjection_pb";
import * as common_pb from "./common_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PathProjectiongetPath = {
  readonly methodName: string;
  readonly service: typeof PathProjection;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof common_pb.ProtoUUID;
  readonly responseType: typeof pathProjection_pb.Path;
};

export class PathProjection {
  static readonly serviceName: string;
  static readonly getPath: PathProjectiongetPath;
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

export class PathProjectionClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getPath(
    requestMessage: common_pb.ProtoUUID,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: pathProjection_pb.Path|null) => void
  ): UnaryResponse;
  getPath(
    requestMessage: common_pb.ProtoUUID,
    callback: (error: ServiceError|null, responseMessage: pathProjection_pb.Path|null) => void
  ): UnaryResponse;
}

