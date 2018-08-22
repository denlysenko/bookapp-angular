import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './read-book-page.component.html',
  styleUrls: ['./read-book-page.component.scss']
})
export class ReadBookPageComponent implements OnInit {
  epubUrl: string;
  bookmark: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.epubUrl = this.route.snapshot.data.reading.epubUrl;
    this.bookmark = this.route.snapshot.data.reading.bookmark;
  }
}
