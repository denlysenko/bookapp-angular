import { EventEmitter } from '@angular/core';

import { MenuItem } from '@bookapp-angular/core';

export abstract class MenuBaseComponent {
  abstract selectedPage: string;
  abstract itemSelected: EventEmitter<MenuItem>;

  select(item: MenuItem) {
    this.itemSelected.emit(item);
  }

  isSelected(page: string): boolean {
    return page === this.selectedPage;
  }
}
