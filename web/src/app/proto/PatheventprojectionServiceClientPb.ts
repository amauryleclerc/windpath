/**
 * @fileoverview gRPC-Web generated client stub for path.events
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as pathcommands_pb from './pathcommands_pb';

import {
  PathEvent,
  PathSession} from './patheventprojection_pb';

export class PathProjectionClient {
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

  methodInfogetPathEventStream = new grpcWeb.AbstractClientBase.MethodInfo(
    PathEvent,
    (request: PathSession) => {
      return request.serializeBinary();
    },
    PathEvent.deserializeBinary
  );

  getPathEventStream(
    request: PathSession,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/path.events.PathProjection/getPathEventStream',
      request,
      metadata || {},
      this.methodInfogetPathEventStream);
  }

}

