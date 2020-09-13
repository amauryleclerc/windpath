import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { UserComponent } from './user/user.component';
import { PathsComponent } from './paths/paths.component';
import { PathComponent } from './path/path.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    UserComponent,
    PathsComponent,
    PathComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
