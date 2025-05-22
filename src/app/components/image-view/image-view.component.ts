import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Image } from 'src/app/modals/image';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-image-view',
    templateUrl: './image-view.component.html',
    styleUrls: ['./image-view.component.css'],
    standalone: false
})
export class ImageViewComponent implements OnInit {

  image: Image | undefined;
  image$: Observable<Image> | undefined;
  categories: string[] = [];
  constructor(
    private _ImageService: ImageService,
    private route: ActivatedRoute,
    private location: Location
  ) { }
  ngOnInit() {
    this.getimage();
    this.getcategory();
  }
  getimage() {
    console.log('fetching id');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("id has been fetched from params->", id);

    this.image$ = this._ImageService.getImage$(id);
    this.image$?.subscribe(image => this.image = image);
  }
  deleteimage(id: number): void {
    this.image == null;
    this._ImageService.deleteImage$(id).pipe(
    ).subscribe(_ =>
      console.log("image deleted is image null ??", _ === null)
    );
  }
  getcategory() {
    this._ImageService.getCategories$().subscribe(
      (category: string) => {
        this.categories.push(category);
        // console.log("this is cat-list",this.categories);
      });
  }
  selectcategory(categoryname: string) {
    if (this.image !== undefined) {
      this.image.category = categoryname;
    }

  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.image) {
      this._ImageService.updateImage$(this.image)
        .subscribe(
          _ => console.log("image updated", _)
        );
    }
  }
}


