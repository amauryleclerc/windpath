import { Injectable } from '@angular/core';
import { PathSummaryProjection } from '../proto-gen/pathSummaryProjection_pb_service';
import { PathSession, PathSummaryProjectionEvent, PathSummary, CurrentSummaryStateEvent, PathSummaryCreatedEvent } from '../proto-gen/pathSummaryProjection_pb';
import { Observable } from 'rxjs';
import { GrpcClientService } from './grpc-client.service';
import { defer, of, timer, merge, interval } from 'rxjs';
import { map, tap, retryWhen, delayWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  public paths: Array<PathSummary>;


  constructor(private client: GrpcClientService) {
    this.paths = new Array();
    this.getPathSummaryEventStream()
    .pipe(
      retryWhen(errors =>
        errors.pipe(
          tap(val => console.error(`Error on getPathSummaryEventStream : ${val}`)),
          tap(val =>   this.paths.splice(0, this.paths.length)),
          delayWhen(val => timer(5000))
        )
      )
    )
    .subscribe(v => this.onEvent(v));
  }

  public getPathSummaryEventStream(): Observable<PathSummaryProjectionEvent> {
    return defer(() => {
      const session: PathSession = new PathSession();
      return this.client.getStream(PathSummaryProjection.getPathSummaryEventStream, session);
    });
  }


  private onEvent(event: PathSummaryProjectionEvent) {
    console.log('onEvent', event);
    if (event.hasCurrentstateevent()) {
      this.onCurrentstateevent(event.getCurrentstateevent());
    }
    if (event.hasPathcreatedevent()) {
      this.onPathcreatedevent(event.getPathcreatedevent());
    }
  }

  private onCurrentstateevent(event: CurrentSummaryStateEvent) {
    this.paths.splice(0, this.paths.length);
    event.getPathsList().forEach(element => {
      this.paths.push(element);
    });

  }
  private onPathcreatedevent(event: PathSummaryCreatedEvent) {

    this.paths.push(event.getPath());
  }


}
