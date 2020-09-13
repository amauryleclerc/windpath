// package: path.domain
// file: pathCommands.proto

var pathCommands_pb = require("./pathCommands_pb");
var common_pb = require("./common_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Path = (function () {
  function Path() {}
  Path.serviceName = "path.domain.Path";
  return Path;
}());

Path.apply = {
  methodName: "apply",
  service: Path,
  requestStream: false,
  responseStream: false,
  requestType: pathCommands_pb.PathCommand,
  responseType: common_pb.GenericResponse
};

exports.Path = Path;

function PathClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PathClient.prototype.apply = function apply(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Path.apply, {
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

exports.PathClient = PathClient;

