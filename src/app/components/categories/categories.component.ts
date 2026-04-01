import { Component, type OnInit, Output, EventEmitter, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit {
  private readonly imageService = inject(ImageService);

  @Output() categorySelected = new EventEmitter<string>();

  readonly categories = signal<string[]>([]);

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.imageService.getCategories().subscribe(category => {
      if (category) {
        this.categories.update(current => [...current, category]);
      }
    });
  }

  selectCategory(category: string): void {
    this.categorySelected.emit(category);
  }
}
