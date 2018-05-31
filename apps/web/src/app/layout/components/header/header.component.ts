import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ba-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'Book App';

  @Input() isMobile: boolean;

  @Output() onToggleSidenav = new EventEmitter<void>();

  toggleSidenav() {
    this.onToggleSidenav.emit();
  }
}
