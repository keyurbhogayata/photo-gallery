import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/modals/image';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
  @Output() AddImageEvent = new EventEmitter<Image>();
  image: Image | undefined;
  constructor(private _ImageService: ImageService) { }
  ngOnInit(): void {
  }
  addimage(url: string): void {
    url = url.trim();
    // console.log(url);
    if (!url) { return; }
    this._ImageService.addImage$({ url } as Image)
    .subscribe();
  }
}
