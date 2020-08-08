import { Injectable } from '@angular/core';
import * as grpcWeb from 'grpc-web';
import { PathClient } from '../proto/PathcommandsServiceClientPb';
import { GenericResponse, ProtoUUID } from '../proto/common_pb';
import { GpxXmlWrapper } from '../proto/gpx_pb';
import { GpxImportServiceClient } from '../proto/GpxServiceClientPb';
import { PathCommand, CreatePathFromGpxCommand } from '../proto/pathcommands_pb';
import { Observable, from, defer } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { Message } from 'google-protobuf';

@Injectable({
  providedIn: 'root'
})
export class GpxService {
  private importService: GpxImportServiceClient;

  constructor() {
    this.importService = new GpxImportServiceClient('http://localhost:8082', null, null);
  }


  public import(file: File): Observable<any> {
    return Observable.create(observer => {
      const wrapper = new GpxXmlWrapper();
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        const byteArray = new Uint8Array(myReader.result as ArrayBuffer);
        wrapper.setGpx(byteArray);
        observer.next(wrapper);
        observer.complete();
      };
      myReader.readAsArrayBuffer(file);
    }).pipe(
      flatMap(wrapper => this.grpcToObservable(this.importService.importGpx.bind(this.importService), wrapper)));
  }

  private grpcStreamtoObservable(grpcStreamFn, opts) {
    return Observable.create(observer => {
      const streamCall: grpcWeb.ClientReadableStream<GenericResponse> = grpcStreamFn(opts);
      console.log(streamCall);
      streamCall.on('data', next => observer.next(next));
      streamCall.on('end', () => observer.complete());
      streamCall.on('error', err => observer.error(err));
    });
  }

  private grpcToObservable(grpcFn, opts): Observable<any> {
    return defer(() => {
      console.log("test");
      return from(grpcFn(opts)) as Observable<Message>;
    })
      .pipe(map(v => v.toObject()));
  }

}
