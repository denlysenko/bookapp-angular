import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { LoaderService } from '~/modules/core/services/loader.service';

import { BookmarksPageBaseComponent } from '../../base/bookmarks-page-base.component';

@Component({
  moduleId: module.id,
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.scss']
})
export class BookmarksPageComponent extends BookmarksPageBaseComponent {
  protected type: string;

  constructor(
    protected apollo: Apollo,
    private route: ActivatedRoute,
    protected loaderService: LoaderService
  ) {
    super();
    this.type = this.route.snapshot.data.type;
  }
}
