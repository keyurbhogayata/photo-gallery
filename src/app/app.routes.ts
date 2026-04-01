import { Routes } from '@angular/router';
import { GalleryDashboardComponent } from './components/gallery-dashboard/gallery-dashboard.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { AboutComponent } from './components/about/about.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
  { path: '', component: GalleryDashboardComponent },
  { path: 'images/:id', component: ImageViewComponent },
  { path: 'About', component: AboutComponent },
  { path: '**', component: NotfoundComponent },
];
