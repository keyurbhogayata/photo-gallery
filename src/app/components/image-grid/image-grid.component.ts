import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/modals/image';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnInit {
  categorycurrent: string = 'default';
  Images: Image[] = [];
  Images$: Observable<Image[]> | undefined;
  Categories: string[] = [];
  Categories$: Observable<string> | undefined;
  constructor(private _Imageservice: ImageService) {
  }

  ngOnInit(): void {
    this.getcategories();
    this.getimages();

  }
  getimages() {
    this.Images$ = this._Imageservice.getImages();
    this.Images$?.subscribe((Images: Image[]) => {
      this.Images = Images;
      // console.log(this.Images);
    });

  }
  getcategories() {
    console.log("in getcategories2 in grid");
    this.Categories$ = this._Imageservice.getCategories();
    if(this.Categories$){
      console.log("categories null");
    }
    this.Categories$.subscribe(category => {
      this.Categories.push(category);
      // console.log("in image grid",this.Categories)
  });
  }
  deleteimage(id: number):void {
      this.Images = this.Images.filter(h => h.id !== id);
      this._Imageservice.deleteImage(id).subscribe();
  }
  addimage(url: string): void {
    url = url.trim();
    // console.log(url);
    if (!url) { return; }
    this._Imageservice.addImage({ url } as Image)
      .subscribe(image => {
        this.Images.push(image);
      });
  }
  selectcategory(category: string): void {
    this.categorycurrent = category;
  }
  // addcategory(categoryname : string){
  //   categoryname = categoryname.trim();
  //   // console.log(url);
  //   if (!categoryname) { return; }
  //   this._Imageservice.addCategory( {categoryname } as Category)
  //     .subscribe(category => {
  //       this.Categories.push(category);
  //     });

  // }
  trackByImgid(index: number, image: any): string {
    return image.id;
  }
}
