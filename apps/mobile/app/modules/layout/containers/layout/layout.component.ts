import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';

import { categories, MenuItem, navs, userMenu } from '@bookapp-angular/core';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { DrawerTransitionBase, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import * as application from 'tns-core-modules/application';
import { isIOS } from 'tns-core-modules/platform';

@Component({
  moduleId: module.id,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('state', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, transform: 'translateY(-100%)' })),
      transition('in <=> out', [animate('300ms ease-out')])
    ])
  ]
})
export class LayoutComponent implements OnInit {
  selectedPage: string;
  navItems = navs;
  categoryItems = categories;
  userMenuItems = userMenu;
  isUserMenuOpen = false;

  @ViewChild('drawer') drawerComponent: RadSideDrawerComponent;

  private _sideDrawerTransition: DrawerTransitionBase;

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {
    // iPhone X fix height
    if (
      isIOS &&
      application.ios.window.safeAreaInsets &&
      application.ios.window.safeAreaInsets.bottom > 0
    ) {
      application.addCss(`
          RadSideDrawer { margin-bottom: -${
            application.ios.window.safeAreaInsets.bottom
          } }
        `);
    }
    this._sideDrawerTransition = new SlideInOnTopTransition();
    this.selectedPage = this.navItems[1].label; // pick 'browse' nav item for now, later will be taking from activated
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  onDrawerButtonTap() {
    this.drawerComponent.sideDrawer.toggleDrawerState();
  }

  selectPageAndNavigate(navItem: MenuItem) {
    this.selectedPage = navItem.label;
    this.drawerComponent.sideDrawer.closeDrawer();
    this.routerExtensions.navigate(['layout', navItem.path], {
      transition: {
        name: 'fade',
        duration: 300,
        curve: 'linear'
      }
    });
  }

  logout() {
    this.routerExtensions.navigate(['/login'], {
      clearHistory: true,
      transition: {
        name: 'flip',
        duration: 300,
        curve: 'linear'
      }
    });
  }
}
