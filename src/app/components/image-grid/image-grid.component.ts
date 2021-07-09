import { Component, Input ,OnChanges,OnInit, SimpleChanges } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/modals/image';
import { Observable} from 'rxjs';
@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnInit{

  @Input() categorycurrent : string = 'default';
  @Input() addedimage : Image | undefined;
  
  Images: Image[] = [];
  Images$: Observable<Image[]> | undefined;
  constructor(private _ImageService: ImageService) {
  }
  ngOnInit(): void {
    this.getimages();
  }
  getimages() {
    this.Images$ = this._ImageService.getImages$();
    this.Images$?.subscribe((Images: Image[]) => {
      this.Images = Images;
    });
  
  }
  deleteimage(image: Image):void {
      this.Images = this.Images.filter(i => i !== image);
      this._ImageService.deleteImage$(image.id).subscribe();
  }
  trackByImgid(index: number, image: any): string {
    return image.id;
  }
}
