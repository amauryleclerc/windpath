/**
 * @fileoverview gRPC-Web generated client stub for path.gpx
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as common_pb from './common_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

import {GpxXmlWrapper} from './gpx_pb';

export class GpxImportServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoimportGpx = new grpcWeb.AbstractClientBase.MethodInfo(
    common_pb.GenericResponse,
    (request: GpxXmlWrapper) => {
      return request.serializeBinary();
    },
    common_pb.GenericResponse.deserializeBinary
  );

  importGpx(
    request: GpxXmlWrapper,
    metadata: grpcWeb.Metadata | null): Promise<common_pb.GenericResponse>;

  importGpx(
    request: GpxXmlWrapper,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: common_pb.GenericResponse) => void): grpcWeb.ClientReadableStream<common_pb.GenericResponse>;

  importGpx(
    request: GpxXmlWrapper,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: common_pb.GenericResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/path.gpx.GpxImportService/importGpx',
        request,
        metadata || {},
        this.methodInfoimportGpx,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/path.gpx.GpxImportService/importGpx',
    request,
    metadata || {},
    this.methodInfoimportGpx);
  }

}

