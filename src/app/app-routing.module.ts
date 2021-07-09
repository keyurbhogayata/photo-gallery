import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GalleryDashboardComponent } from './components/gallery-dashboard/gallery-dashboard.component';
import { AppComponent } from './app.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { AboutComponent } from './components/about/about.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: GalleryDashboardComponent },
  { path: 'images/:id', component: ImageViewComponent },
  // { path: 'images/:category', component: GalleryDashboardComponent },
  { path: 'About', component: AboutComponent },
  { path: '**', component: NotfoundComponent },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
