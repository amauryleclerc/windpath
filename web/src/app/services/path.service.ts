import { Injectable } from '@angular/core';
import * as grpcWeb from 'grpc-web';
import { PathClient } from '../proto/PathcommandsServiceClientPb';
import { GenericResponse, ProtoUUID } from '../proto/common_pb';
import { GpxXmlWrapper } from '../proto/gpx_pb';
import { PathProjectionClient } from '../proto/PatheventprojectionServiceClientPb';
import { PathCommand, CreatePathFromGpxCommand } from '../proto/pathcommands_pb';
import { Observable, from, defer } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { Message } from 'google-protobuf';
import { PathSession } from '../proto/patheventprojection_pb';

@Injectable({
  providedIn: 'root'
})
export class PathService {
  private pathProjectionService: PathProjectionClient;

  constructor() {
    this.pathProjectionService = new PathProjectionClient('http://localhost:8082', null, null);
  }


  public getPathSummaryEventStream(): Observable<GenericResponse> {
    const session: PathSession = new PathSession();
    return this.grpcStreamtoObservable(this.pathProjectionService.getPathSummaryEventStream.bind(this.pathProjectionService), session);
  }

  private grpcStreamtoObservable(grpcStreamFn, opts): Observable<any> {
    return Observable.create(observer => {
      const streamCall: grpcWeb.ClientReadableStream<any> = grpcStreamFn(opts);
      console.log('connect');
      streamCall.on('data', next => {
        console.log(next);
        observer.next(next);
      });
      streamCall.on('end', () => observer.complete());
      streamCall.on('error', err => observer.error(err));
      streamCall.on('status', status => console.log(status));
    })
    .pipe(map((v: Message) => v.toObject()));
  }

  private grpcToObservable(grpcFn, opts): Observable<any> {
    return defer(() => {
      return from(grpcFn(opts)) as Observable<Message>;
    })
      .pipe(map(v => v.toObject()));
  }

}
