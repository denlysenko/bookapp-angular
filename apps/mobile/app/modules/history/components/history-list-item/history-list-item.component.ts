import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Log, LOG_ACTIONS } from '@bookapp-angular/history-core';

@Component({
  moduleId: module.id,
  selector: 'ba-history-list-item',
  templateUrl: './history-list-item.component.html',
  styleUrls: ['./history-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryListItemComponent {
  readonly actions = LOG_ACTIONS;

  @Input()
  log: Log;
}
