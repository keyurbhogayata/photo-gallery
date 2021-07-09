import { Component, OnInit } from '@angular/core';
import { navigation_option } from 'src/app/modals/navigation_option';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = 'Photo Gallery';
  navigation_options: navigation_option[] = [
    {
      title: "Home",
      link: "/",
      isActive: true
    },
    {
      title: "About",
      link: "/About",
      isActive: false
    },
    // {
    //   title: "xyz",
    //   link: "/xyz",
    //   isActive: false
    // },
  ];
  toggle(index: number) {
    this.navigation_options[index].isActive = !this.navigation_options[index].isActive
    for (let option of this.navigation_options) {
      if (option === this.navigation_options[index]) {
        option.isActive = true;
      }
      else option.isActive = false;
    }
  };


  constructor() { }

  ngOnInit(): void {
  }

}
