import { Injectable } from '@angular/core';
import { GpxImportServiceClient, GpxImportService } from '../proto-gen/gpx_pb_service';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { GrpcClientService } from './grpc-client.service';
import { GpxXmlWrapper } from '../proto-gen/gpx_pb';

@Injectable({
  providedIn: 'root'
})
export class GpxService {
  constructor(private client: GrpcClientService) {
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
      flatMap((wrapper: GpxXmlWrapper) => this.client.getStream(GpxImportService.importGpx, wrapper)));
  }

}
