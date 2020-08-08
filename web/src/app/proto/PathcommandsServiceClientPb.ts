/**
 * @fileoverview gRPC-Web generated client stub for path.commands
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as common_pb from './common_pb';
import * as gpx_pb from './gpx_pb';

import {PathCommand} from './pathcommands_pb';

export class PathClient {
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

  methodInfoapply = new grpcWeb.AbstractClientBase.MethodInfo(
    common_pb.GenericResponse,
    (request: PathCommand) => {
      return request.serializeBinary();
    },
    common_pb.GenericResponse.deserializeBinary
  );

  apply(
    request: PathCommand,
    metadata: grpcWeb.Metadata | null): Promise<common_pb.GenericResponse>;

  apply(
    request: PathCommand,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: common_pb.GenericResponse) => void): grpcWeb.ClientReadableStream<common_pb.GenericResponse>;

  apply(
    request: PathCommand,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: common_pb.GenericResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/path.commands.Path/apply',
        request,
        metadata || {},
        this.methodInfoapply,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/path.commands.Path/apply',
    request,
    metadata || {},
    this.methodInfoapply);
  }

}

