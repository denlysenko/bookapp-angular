import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[baInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
  @Output() onTotalScroll = new EventEmitter<void>();

  private scrollHandler: any;

  constructor(private elem: ElementRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.addScrollListener();
  }

  ngOnDestroy() {
    this.removeScrollListener();
  }

  private addScrollListener() {
    this.ngZone.runOutsideAngular(() => {
      this.scrollHandler = () => {
        if (this.isScrolledToBottom()) {
          this.onTotalScroll.emit();
        }
      };

      this.elem.nativeElement.addEventListener('scroll', this.scrollHandler);
    });
  }

  private removeScrollListener() {
    if (this.scrollHandler) {
      this.elem.nativeElement.removeEventListener('scroll', this.scrollHandler);
    }
  }

  private isScrolledToBottom() {
    return (
      this.elem.nativeElement.scrollHeight -
        this.elem.nativeElement.scrollTop ===
      this.elem.nativeElement.clientHeight
    );
  }
}
