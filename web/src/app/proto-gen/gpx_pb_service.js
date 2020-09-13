// package: path.gpx
// file: gpx.proto

var gpx_pb = require("./gpx_pb");
var common_pb = require("./common_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var GpxImportService = (function () {
  function GpxImportService() {}
  GpxImportService.serviceName = "path.gpx.GpxImportService";
  return GpxImportService;
}());

GpxImportService.importGpx = {
  methodName: "importGpx",
  service: GpxImportService,
  requestStream: false,
  responseStream: false,
  requestType: gpx_pb.GpxXmlWrapper,
  responseType: common_pb.GenericResponse
};

exports.GpxImportService = GpxImportService;

function GpxImportServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

GpxImportServiceClient.prototype.importGpx = function importGpx(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GpxImportService.importGpx, {
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

exports.GpxImportServiceClient = GpxImportServiceClient;

