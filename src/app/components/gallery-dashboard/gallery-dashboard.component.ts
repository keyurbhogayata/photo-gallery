import { Component, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/modals/image';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CategoriesComponent } from '../categories/categories.component';
import { AddImageComponent } from '../add-image/add-image.component';
import { ImageGridComponent } from '../image-grid/image-grid.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-gallery-dashboard',
    templateUrl: './gallery-dashboard.component.html',
    styleUrls: ['./gallery-dashboard.component.css'],
    standalone: true,
    imports: [
      CommonModule,
      NavbarComponent,
      CategoriesComponent,
      AddImageComponent,
      ImageGridComponent,
      FooterComponent
    ]
})
export class GalleryDashboardComponent implements OnInit {
  @Output() categorycurrent: string = 'default';
  @Output() image: Image | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  selectcategory(category: string) {
    this.categorycurrent=category;
  }
  addimage(image : Image){
      this.image = image
  }
  
}
