import { Injectable } from '@angular/core';
import { grpc } from '@improbable-eng/grpc-web';
import { GenericResponse, ProtoUUID } from '../proto-gen/common_pb';
import { GpxXmlWrapper } from '../proto-gen/gpx_pb';
import { GpxImportServiceClient, GpxImportService } from '../proto-gen/gpx_pb_service';
import { Observable, from, defer } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { Message } from 'google-protobuf';
import { MethodDefinition } from '@improbable-eng/grpc-web/dist/typings/service';

@Injectable({
  providedIn: 'root'
})
export class GrpcClientService {
  private backend: string;

  constructor() {
    this.backend = 'http://localhost:8082';
  }

  // tslint:disable-next-line:max-line-length
  public getStream<TResponse extends grpc.ProtobufMessage, TRequest extends grpc.ProtobufMessage>(methodDescriptor: MethodDefinition<TRequest, TResponse>, requestMessage: TRequest): Observable<TResponse> {
    return Observable.create(observer => {
      grpc.invoke(methodDescriptor, {
        host: this.backend,
        request: requestMessage,
        metadata: new grpc.Metadata(),
        onHeaders: (headers: grpc.Metadata) => {
          console.log('onHeaders ' + methodDescriptor.methodName, headers);
        },
        onMessage: (message: TResponse) => {
          console.log('onMessage ' + methodDescriptor.methodName, message);
          observer.next(message);
        },
        onEnd: (status: grpc.Code, statusMessage: string, trailers: grpc.Metadata) => {
          console.log('onEnd ' + methodDescriptor.methodName, status, statusMessage, trailers);
          if (status === grpc.Code.OK) {
            observer.complete();
          } else {
            observer.error(statusMessage);
          }
        }
      });
    })
      .pipe(map((v: Message) => {
        return v;
      }));
  }

}
