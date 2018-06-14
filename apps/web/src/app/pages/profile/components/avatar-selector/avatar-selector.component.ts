import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ba-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarSelectorComponent {
  constructor() {}
}
