import { Component, Input, OnInit, signal } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/modals/image';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-image-grid',
    templateUrl: './image-grid.component.html',
    styleUrls: ['./image-grid.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class ImageGridComponent implements OnInit {

  @Input() categorycurrent: string = 'default';
  @Input() addedimage: Image | undefined;

  Images = signal<Image[]>([]); // Using signal for reactive state

  constructor(private _ImageService: ImageService) {}

  ngOnInit(): void {
    this.getimages();
  }

  getimages() {
    this._ImageService.getImages$().subscribe((images: Image[]) => {
      this.Images.set(images); // Set the signal with the fetched images
    });
  }

  deleteimage(image: Image): void {
    this.Images.update(images => images.filter(i => i !== image)); // Update the signal state
    this._ImageService.deleteImage$(image.id).subscribe();
  }

  trackByImgid(index: number, image: any): string {
    return image.id;
  }
}
