import { Component, OnInit, Output } from '@angular/core';
import { Image } from 'src/app/modals/image';

@Component({
    selector: 'app-gallery-dashboard',
    templateUrl: './gallery-dashboard.component.html',
    styleUrls: ['./gallery-dashboard.component.css'],
    standalone: false
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
