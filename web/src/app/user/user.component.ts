import { Component, OnInit } from '@angular/core';
import * as grpcWeb from 'grpc-web';
import { PathClient } from '../proto/PathcommandsServiceClientPb';
import { GenericResponse, ProtoUUID } from '../proto/common_pb';
import { PathCommand, CreatePathFromGpxCommand } from '../proto/pathcommands_pb';
import { GpxService } from '../services/gpx.service';
import { PathService } from '../services/path.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private gpxService: GpxService, private pathService: PathService) { }

  ngOnInit(): void {
    this.pathService.getPathSummaryEventStream().subscribe(v => {
      console.log('event :');
      console.log(v);
    }, err => console.error(err), () => console.log('end'));
  }

  onClickMe() {
    const echoService = new PathClient('http://localhost:8082', null, null);

    const request = new PathCommand();
    const aggId = new ProtoUUID();

    const ran = this.getRandomInt();
    console.log(ran);
    aggId.setMostsigbits(ran);
    aggId.setLeastsigbits(10);

    console.log(aggId.toObject());

    request.setId(aggId);
    const createCommmand = new CreatePathFromGpxCommand();
    request.setCreatepathfromgpxcommand(createCommmand);

    const call = echoService.apply(request, { 'custom-header-1': 'value1' },
      (err: grpcWeb.Error, response: GenericResponse) => {
        console.log("err");
        console.log(err);
        console.log("response");
        console.log(response);
        console.log(response.toObject());
      });
    call.on('status', (status: grpcWeb.Status) => {
      // ...
      console.log("status");
      console.log(status);
    });
  }

  getRandomInt(): number {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }

  onAddGpx(event: Event) {
    const file: File = (event.target as HTMLInputElement).files[0];
    this.gpxService.import(file).subscribe(v => {
      console.log('event :');
      console.log(v);
    }, err => console.error(err), () => console.log('end'));
  }

}
