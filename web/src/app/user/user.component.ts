import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'd-flex flex-row flex-grow-1'
  }
})
export class UserComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }


}
