import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { ListResponse } from '@bookapp-angular/core';

import { Log } from '../models';
import { HistoryService } from '../services';

@Injectable()
export class LogsResolver implements Resolve<ListResponse<Log>> {
  constructor(private historyService: HistoryService) {}

  resolve(): Observable<ListResponse<Log>> {
    return this.historyService.getLogs();
  }
}
