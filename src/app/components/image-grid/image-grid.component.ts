import { Component, Input, type OnInit, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { ImageService } from '../../services/image.service';
import type { Image } from '../../modals/image';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageGridComponent implements OnInit {
  private readonly imageService = inject(ImageService);

  @Input() currentCategory = 'default';
  @Input() addedImage: Image | undefined;

  readonly images = signal<Image[]>([]);

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages(): void {
    this.imageService.getImages().subscribe((images: Image[]) => {
      this.images.set(images);
    });
  }

  deleteImage(image: Image): void {
    this.images.update(items => items.filter(i => i !== image));
    this.imageService.deleteImage(image.id).subscribe();
  }

  trackByImageId(_index: number, image: Image): number {
    return image.id;
  }
}
