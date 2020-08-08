/**
 * @fileoverview gRPC-Web generated client stub for path.projection
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as common_pb from './common_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

import {
  PathSession,
  PathSummaryProjectionEvent} from './patheventprojection_pb';

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

  methodInfogetPathSummaryEventStream = new grpcWeb.AbstractClientBase.MethodInfo(
    PathSummaryProjectionEvent,
    (request: PathSession) => {
      return request.serializeBinary();
    },
    PathSummaryProjectionEvent.deserializeBinary
  );

  getPathSummaryEventStream(
    request: PathSession,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/path.projection.PathProjection/getPathSummaryEventStream',
      request,
      metadata || {},
      this.methodInfogetPathSummaryEventStream);
  }

}

