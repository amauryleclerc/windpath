// package: path.projection
// file: pathSummaryProjection.proto

import * as pathSummaryProjection_pb from "./pathSummaryProjection_pb";
import * as common_pb from "./common_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PathSummaryProjectiongetPathSummaryEventStream = {
  readonly methodName: string;
  readonly service: typeof PathSummaryProjection;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof pathSummaryProjection_pb.PathSession;
  readonly responseType: typeof pathSummaryProjection_pb.PathSummaryProjectionEvent;
};

type PathSummaryProjectiongetPathSummary = {
  readonly methodName: string;
  readonly service: typeof PathSummaryProjection;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof common_pb.ProtoUUID;
  readonly responseType: typeof pathSummaryProjection_pb.PathSummary;
};

export class PathSummaryProjection {
  static readonly serviceName: string;
  static readonly getPathSummaryEventStream: PathSummaryProjectiongetPathSummaryEventStream;
  static readonly getPathSummary: PathSummaryProjectiongetPathSummary;
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

export class PathSummaryProjectionClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getPathSummaryEventStream(requestMessage: pathSummaryProjection_pb.PathSession, metadata?: grpc.Metadata): ResponseStream<pathSummaryProjection_pb.PathSummaryProjectionEvent>;
  getPathSummary(
    requestMessage: common_pb.ProtoUUID,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: pathSummaryProjection_pb.PathSummary|null) => void
  ): UnaryResponse;
  getPathSummary(
    requestMessage: common_pb.ProtoUUID,
    callback: (error: ServiceError|null, responseMessage: pathSummaryProjection_pb.PathSummary|null) => void
  ): UnaryResponse;
}

