import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ba-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @Input() visible: boolean;
}
