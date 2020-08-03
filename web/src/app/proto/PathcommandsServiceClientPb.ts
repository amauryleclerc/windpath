/**
 * @fileoverview gRPC-Web generated client stub for path.commands
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import {
  GenericResponse,
  PathCommand} from './pathcommands_pb';

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
    GenericResponse,
    (request: PathCommand) => {
      return request.serializeBinary();
    },
    GenericResponse.deserializeBinary
  );

  apply(
    request: PathCommand,
    metadata: grpcWeb.Metadata | null): Promise<GenericResponse>;

  apply(
    request: PathCommand,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: GenericResponse) => void): grpcWeb.ClientReadableStream<GenericResponse>;

  apply(
    request: PathCommand,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: GenericResponse) => void) {
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

