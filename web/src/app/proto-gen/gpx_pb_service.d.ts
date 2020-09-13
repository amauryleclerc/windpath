// package: path.gpx
// file: gpx.proto

import * as gpx_pb from "./gpx_pb";
import * as common_pb from "./common_pb";
import {grpc} from "@improbable-eng/grpc-web";

type GpxImportServiceimportGpx = {
  readonly methodName: string;
  readonly service: typeof GpxImportService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof gpx_pb.GpxXmlWrapper;
  readonly responseType: typeof common_pb.GenericResponse;
};

export class GpxImportService {
  static readonly serviceName: string;
  static readonly importGpx: GpxImportServiceimportGpx;
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

export class GpxImportServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  importGpx(
    requestMessage: gpx_pb.GpxXmlWrapper,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: common_pb.GenericResponse|null) => void
  ): UnaryResponse;
  importGpx(
    requestMessage: gpx_pb.GpxXmlWrapper,
    callback: (error: ServiceError|null, responseMessage: common_pb.GenericResponse|null) => void
  ): UnaryResponse;
}

