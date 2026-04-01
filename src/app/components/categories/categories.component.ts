import { Component, OnInit, Input, Output, EventEmitter, signal } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css'],
    standalone: false
})
export class CategoriesComponent implements OnInit {
  @Output() CategorycurrentEvent = new EventEmitter<string>();
  categorycurrent: string = 'default';
  Categories = signal<string[]>([]); // Using signal for reactive state

  constructor(private _ImageService: ImageService) {}

  ngOnInit(): void {
    this.getcategories();
  }

  getcategories() {
    console.log("in getcategories2 in grid");
    this._ImageService.getCategories$().subscribe(category => {
      if (category !== undefined) {
        this.Categories.update(categories => [...categories, category]); // Update signal
      }
    });
  }

  selectcategoryfn(category: string) {
    this.CategorycurrentEvent.emit(category);
  }

}
