import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { Image } from '../../modals/image';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageViewComponent implements OnInit {
  private readonly imageService = inject(ImageService);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  readonly image = signal<Image | undefined>(undefined);
  readonly categories = signal<string[]>([]);

  ngOnInit(): void {
    this.fetchImage();
    this.fetchCategories();
  }

  fetchImage(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.imageService.getImage(id).subscribe(img => this.image.set(img));
    }
  }

  fetchCategories(): void {
    this.imageService.getCategories().subscribe(category => {
      if (category) {
        this.categories.update(current => [...current, category]);
      }
    });
  }

  deleteImage(id: number): void {
    this.imageService.deleteImage(id).subscribe(() => {
      this.goBack();
    });
  }

  selectCategory(categoryName: string): void {
    const currentImage = this.image();
    if (currentImage) {
      this.image.set({ ...currentImage, category: categoryName });
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const currentImage = this.image();
    if (currentImage) {
      this.imageService.updateImage(currentImage).subscribe(() => {
        this.goBack();
      });
    }
  }
}
