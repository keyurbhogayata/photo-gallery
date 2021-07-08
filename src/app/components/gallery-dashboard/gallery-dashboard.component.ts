import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/modals/image';

@Component({
  selector: 'app-gallery-dashboard',
  templateUrl: './gallery-dashboard.component.html',
  styleUrls: ['./gallery-dashboard.component.css']
})
export class GallaryDashboardComponent implements OnInit {
  categorycurrent: string = 'default';
  constructor() { }

  ngOnInit(): void {
  }

  selectcategory(category: string) {
    this.categorycurrent=category;
  }
  
}
