import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFilterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
