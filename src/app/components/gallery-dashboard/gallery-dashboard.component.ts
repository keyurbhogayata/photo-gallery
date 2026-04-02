import { Component, ChangeDetectionStrategy } from '@angular/core';
import type { Image } from '../../modals/image';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CategoriesComponent } from '../categories/categories.component';
import { AddImageComponent } from '../add-image/add-image.component';
import { ImageGridComponent } from '../image-grid/image-grid.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-gallery-dashboard',
  templateUrl: './gallery-dashboard.component.html',
  styleUrls: ['./gallery-dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    CategoriesComponent,
    AddImageComponent,
    ImageGridComponent,
    FooterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryDashboardComponent {
  currentCategory = 'default';
  addedImage: Image | undefined;

  selectCategory(category: string): void {
    this.currentCategory = category;
  }

  onImageAdded(image: Image): void {
    this.addedImage = image;
  }
}
