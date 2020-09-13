// package: path.projection
// file: pathSummaryProjection.proto

var pathSummaryProjection_pb = require("./pathSummaryProjection_pb");
var common_pb = require("./common_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PathSummaryProjection = (function () {
  function PathSummaryProjection() {}
  PathSummaryProjection.serviceName = "path.projection.PathSummaryProjection";
  return PathSummaryProjection;
}());

PathSummaryProjection.getPathSummaryEventStream = {
  methodName: "getPathSummaryEventStream",
  service: PathSummaryProjection,
  requestStream: false,
  responseStream: true,
  requestType: pathSummaryProjection_pb.PathSession,
  responseType: pathSummaryProjection_pb.PathSummaryProjectionEvent
};

PathSummaryProjection.getPathSummary = {
  methodName: "getPathSummary",
  service: PathSummaryProjection,
  requestStream: false,
  responseStream: false,
  requestType: common_pb.ProtoUUID,
  responseType: pathSummaryProjection_pb.PathSummary
};

exports.PathSummaryProjection = PathSummaryProjection;

function PathSummaryProjectionClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PathSummaryProjectionClient.prototype.getPathSummaryEventStream = function getPathSummaryEventStream(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(PathSummaryProjection.getPathSummaryEventStream, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

PathSummaryProjectionClient.prototype.getPathSummary = function getPathSummary(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PathSummaryProjection.getPathSummary, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.PathSummaryProjectionClient = PathSummaryProjectionClient;

