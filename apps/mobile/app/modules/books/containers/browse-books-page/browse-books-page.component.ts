import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { FILTER_KEYS, StoreService } from '@bookapp-angular/core';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { SegmentedBarItem } from 'ui/segmented-bar';

import { BookSearchComponent } from '../../components/book-search/book-search.component';

@Component({
  moduleId: module.id,
  selector: 'ba-browse-books-page',
  templateUrl: './browse-books-page.component.html',
  styleUrls: ['./browse-books-page.component.scss']
})
export class BrowseBooksPageComponent implements OnInit {
  sortItems: Array<SegmentedBarItem>;
  selectedOption: number;

  private sortOptions = [
    {
      value: '',
      label: 'All books'
    },
    {
      value: 'createdAt_desc',
      label: 'Most recents'
    },
    {
      value: 'views_desc',
      label: 'Most popular'
    }
  ];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalDialogService,
    private storeService: StoreService
  ) {
    this.sortItems = this.genSortItems();
  }

  ngOnInit() {
    const filter = this.storeService.get(FILTER_KEYS.BROWSE_BOOKS);
    if (filter) {
      const { sortValue } = filter;
      const idx = this.sortOptions.findIndex(opt => opt.value === sortValue);
      this.selectedOption = idx !== -1 ? idx : 0;
    } else {
      this.selectedOption = 0;
    }
  }

  async onSearchButtonTap() {
    const options: ModalDialogOptions = {
      context: {},
      fullscreen: true,
      animated: false,
      viewContainerRef: this.viewContainerRef
    };

    const result = await this.modalService.showModal(
      BookSearchComponent,
      options
    );

    if (result) {
      console.log(result);
    }
  }

  onSelectedIndexChange(args) {
    this.selectedOption = args.object.selectedIndex;
    const { value } = this.sortOptions[this.selectedOption];

    this.storeService.set(FILTER_KEYS.BROWSE_BOOKS, {
      sortValue: value
    });

    console.log(value);
  }

  private genSortItems(): SegmentedBarItem[] {
    return this.sortOptions.map(opt => {
      const item = new SegmentedBarItem();
      item.title = opt.label;
      return item;
    });
  }
}
