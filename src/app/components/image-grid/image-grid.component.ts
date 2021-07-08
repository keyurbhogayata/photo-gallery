import { Component, Input ,OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/modals/image';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnInit {
  @Input() categorycurrent : string = 'default';
  Images: Image[] = [];
  Images$: Observable<Image[]> | undefined;
  // Categories: string[] = [];
  // Categories$: Observable<string> | undefined;
  constructor(private _ImageService: ImageService) {
  }
  ngOnInit(): void {
    // this.getcategories();
    this.getimages();

  }
  getimages() {
    this.Images$ = this._ImageService.getImages$();
    this.Images$?.subscribe((Images: Image[]) => {
      this.Images = Images;
    });
  
  }
  // getcategories() {
  //   console.log("in getcategories2 in grid");
  //   this.Categories$ = this._ImageService.getCategories$();
  //   if(this.Categories$){
  //     console.log("categories null");
  //   }
  //   this.Categories$.subscribe(category => {
  //     this.Categories.push(category);
  //     // console.log("in image grid",this.Categories)
  // });
  // }
  deleteimage(image: Image):void {
      this.Images = this.Images.filter(i => i !== image);
      this._ImageService.deleteImage$(image.id).subscribe();
  }
  // addimage(url: string): void {
  //   url = url.trim();
  //   // console.log(url);
  //   if (!url) { return; }
  //   this._ImageService.addImage$({ url } as Image)
  //       .subscribe(image => {
  //       this.Images.push(image);
  //     });
  // }
  // selectcategory(category: string): void {
  //   this.categorycurrent = category;
  // }
  trackByImgid(index: number, image: any): string {
    return image.id;
  }
}
