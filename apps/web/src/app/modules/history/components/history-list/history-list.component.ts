import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent, Sort } from '@angular/material';

import { LIMIT } from '@bookapp-angular/core';
import { Log } from '@bookapp-angular/history-core';

@Component({
  selector: 'ba-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryListComponent {
  readonly displayedColumns: string[] = ['createdAt', 'action', 'book'];
  readonly defaultLimit = LIMIT;

  sorting = {
    active: 'createdAt',
    direction: 'desc'
  };

  @Input()
  logs: Log[];

  @Input()
  totalCount: number;

  @Output()
  onSort = new EventEmitter<Sort>();

  @Output()
  onPageChange = new EventEmitter<PageEvent>();
}
