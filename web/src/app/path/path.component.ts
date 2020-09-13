import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrpcClientService } from '../services/grpc-client.service';
import { UUIDUtil } from '../toolkit/uuid.util';
import { flatMap, map } from 'rxjs/operators';
import { Path } from '../proto-gen/pathProjection_pb';
import { PathProjection } from '../proto-gen/pathProjection_pb_service';
import { MapComponent } from '../map/map.component';
import 'leaflet/dist/images/marker-shadow.png';
@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'd-flex flex-row flex-grow-1'
  }
})
export class PathComponent implements OnInit {

  path: Path;

  @ViewChild(MapComponent)
  private mapComponent: MapComponent;


  constructor(private route: ActivatedRoute, private client: GrpcClientService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => UUIDUtil.toProtoUUID(params.pathId)),
      flatMap(id => this.client.getStream(PathProjection.getPath, id)))
      .subscribe(path => {
        console.log('path', path.toObject());
        this.path = path;
        this.mapComponent.addPath(path);
      }, e => console.error(e));
  }

}
