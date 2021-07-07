import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Image } from 'src/app/modals/image';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

  image: Image | undefined;
  Images: Image[] = [];
  image$ : Observable<Image> | undefined;
  categories : string[] = [];
  url$ : Observable<string> | undefined;
  description$ : Observable<string> | undefined;
  title$ : Observable<string> | undefined;
  constructor(
    private _ImageService: ImageService,
    private route: ActivatedRoute,
    private location: Location
  ) { }
  ngOnInit() {
    this.getimage();
    this.getimage$();
    this.getcategory();
  }
  getimage() {
    // console.log('fetching id');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // console.log("id has been fatched ->", id);
    this.image = this._ImageService.getImage(id);
  }
  getimage$() {
    // console.log('fetching id');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // console.log("id has been fatched ->", id);
    this.image$ = this._ImageService?.getImage$(id);
    this.url$ = this.image$?.pipe(
      pluck('url')
    );
    this.description$ = this.image$?.pipe(
      pluck('description')
    );
    
    this.title$ = this.image$?.pipe(
      pluck('title')
    );
  }
  deleteimage(id: number):void {
    this.Images = this.Images.filter(h => h.id !== id);
    this._ImageService.deleteImage(id).subscribe();
  }
  getcategory(){
    this._ImageService.getCategories().subscribe(
      ( category: string )=> {
        this.categories.push(category);
        // console.log("this is cat-list",this.categories);
      });
  }
  selectcategory(categoryname : string){
    if (this.image !== undefined)
    {
      this.image.category = categoryname;
    }

  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.image) {
      this._ImageService.updateImage(this.image)
        .subscribe(() => this.goBack());
    }
  }
}
