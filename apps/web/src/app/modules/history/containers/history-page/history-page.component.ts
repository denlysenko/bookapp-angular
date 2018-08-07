import { Component, OnInit } from '@angular/core';
import { PageEvent, Sort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { Log } from '@bookapp-angular/history-core';

@Component({
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {
  logs: Log[];
  totalCount: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.logs = this.route.snapshot.data.logs.rows;
    this.totalCount = this.route.snapshot.data.logs.count;
  }

  sort(event: Sort) {
    console.log(event);
  }

  paginate(event: PageEvent) {
    console.log(event);
  }
}
