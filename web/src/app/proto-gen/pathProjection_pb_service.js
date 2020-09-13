// package: path.projection
// file: pathProjection.proto

var pathProjection_pb = require("./pathProjection_pb");
var common_pb = require("./common_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PathProjection = (function () {
  function PathProjection() {}
  PathProjection.serviceName = "path.projection.PathProjection";
  return PathProjection;
}());

PathProjection.getPath = {
  methodName: "getPath",
  service: PathProjection,
  requestStream: false,
  responseStream: false,
  requestType: common_pb.ProtoUUID,
  responseType: pathProjection_pb.Path
};

exports.PathProjection = PathProjection;

function PathProjectionClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PathProjectionClient.prototype.getPath = function getPath(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PathProjection.getPath, {
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

exports.PathProjectionClient = PathProjectionClient;

