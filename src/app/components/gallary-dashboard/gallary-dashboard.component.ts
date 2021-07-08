import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/modals/image';

@Component({
  selector: 'app-gallary-dashboard',
  templateUrl: './gallary-dashboard.component.html',
  styleUrls: ['./gallary-dashboard.component.css']
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
