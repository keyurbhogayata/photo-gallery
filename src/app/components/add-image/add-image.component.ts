import { Component, EventEmitter, Output, inject, ChangeDetectionStrategy } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { type Image } from '../../modals/image';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddImageComponent {
  private readonly imageService = inject(ImageService);

  @Output() imageAdded = new EventEmitter<Image>();

  addImage(url: string): void {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      return;
    }
    
    this.imageService.addImage({ url: trimmedUrl } as Image).subscribe(newImage => {
      this.imageAdded.emit(newImage);
    });
  }
}
