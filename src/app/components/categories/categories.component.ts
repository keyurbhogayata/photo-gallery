import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Output() CategorycurrentEvent = new EventEmitter<string>();
  categorycurrent: string = 'default';
  Categories: string[] = [];
  Categories$: Observable<string> | undefined;
  constructor(private _ImageService: ImageService) {
  }

  ngOnInit(): void {
    this.getcategories();
  }
  getcategories() {
    console.log("in getcategories2 in grid");
    this.Categories$ = this._ImageService.getCategories$();
    this.Categories$.subscribe(category => {
      if(category !== undefined) this.Categories.push(category);
      // console.log("in image grid",this.Categories) 
  });
  }
  selectcategoryfn(category: string){
    this.CategorycurrentEvent.emit(category);
  }

}
