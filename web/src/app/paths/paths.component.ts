import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PathSummary } from '../proto-gen/pathSummaryProjection_pb';
import { GpxService } from '../services/gpx.service';
import { PathService } from '../services/path.service';
import { ProtoUUID } from '../proto-gen/common_pb';
import { UUIDUtil } from '../toolkit/uuid.util';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'd-flex flex-row flex-grow-1'
  }
})
export class PathsComponent implements OnInit {

  @ViewChild('addGpxButton')
  addGpxButton: ElementRef;

  paths: Array<PathSummary>;

  constructor(private gpxService: GpxService, private pathService: PathService) {
    this.paths = this.pathService.paths;
  }

  ngOnInit(): void {

  }

  onAddGpx(event: Event) {
    const file: File = (event.target as HTMLInputElement).files[0];
    this.gpxService.import(file).subscribe(v => {
      console.log('import result', v);
    }, err => console.error(err), () => this.addGpxButton.nativeElement.value = '');
  }

  protoUUIDToString(id: ProtoUUID): string {
    return UUIDUtil.toString(id);
  }




}
