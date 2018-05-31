import { Component } from '@angular/core';

@Component({
  selector: 'ba-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  navs = [
    {
      label: 'Now reading',
      path: 'reading',
      icon: 'book'
    },
    {
      label: 'Browse',
      path: 'browse',
      icon: 'language'
    },
    {
      label: 'Buy',
      path: 'buy',
      icon: 'shopping_cart'
    },
    {
      label: 'Favourite',
      path: 'favourite',
      icon: 'star'
    },
    {
      label: 'Wishlist',
      path: 'wishlist',
      icon: 'list'
    },
    {
      label: 'History',
      path: 'history',
      icon: 'schedule'
    }
  ];

  categories = [
    {
      label: 'Must read titles',
      path: 'mustread',
      icon: 'fiber_manual_record'
    },
    {
      label: 'List of the Best',
      path: 'best',
      icon: 'fiber_manual_record'
    }
  ];
}
