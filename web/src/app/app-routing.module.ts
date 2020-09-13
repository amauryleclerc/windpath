import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { PathsComponent } from './paths/paths.component';
import { UserComponent } from './user/user.component';
import { PathComponent } from './path/path.component';


const routes: Routes = [
  { path: 'paths', component: PathsComponent },
  { path: '',   redirectTo: '/paths', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'path/:pathId', component: PathComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
