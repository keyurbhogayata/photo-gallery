import { Component, ChangeDetectionStrategy } from '@angular/core';
import type { NavigationOption } from '../../modals/navigation-option';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  readonly title = 'Photo Gallery';
  readonly navigationOptions: NavigationOption[] = [
    {
      title: 'Home',
      link: '/',
      isActive: true
    },
    {
      title: 'About',
      link: '/About',
      isActive: false
    }
  ];

  toggleActive(index: number): void {
    this.navigationOptions.forEach((option, i) => {
      option.isActive = i === index;
    });
  }
}
