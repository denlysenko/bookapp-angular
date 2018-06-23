import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[baDrop]'
})
export class DropDirective implements OnInit, OnDestroy {
  @Output() dropped = new EventEmitter<any>();

  private highlighted = false;
  private dragOverHandler: () => void;

  constructor(
    private elemRef: ElementRef,
    private renderer: Renderer2,
    private zone: NgZone
  ) {}

  ngOnInit() {
    if (!this.dragOverHandler) {
      this.zone.runOutsideAngular(() => {
        this.dragOverHandler = () => {
          event.preventDefault();
        };

        this.elemRef.nativeElement.addEventListener(
          'dragover',
          this.dragOverHandler
        );
      });
    }
  }

  @HostListener('dragenter')
  onDragEnter() {
    this.toggleHighlight();
  }

  @HostListener('dragleave')
  onDragLeave() {
    this.toggleHighlight();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    event.preventDefault();
    this.toggleHighlight();
    this.dropped.emit(event);
  }

  ngOnDestroy() {
    if (this.dragOverHandler) {
      this.zone.runOutsideAngular(() => {
        this.elemRef.nativeElement.removeEventListener(
          'dragover',
          this.dragOverHandler
        );
        this.dragOverHandler = null;
      });
    }
  }

  private toggleHighlight() {
    this.highlighted = !this.highlighted;

    if (this.highlighted) {
      this.renderer.addClass(this.elemRef.nativeElement, 'highlighted');
    } else {
      this.renderer.removeClass(this.elemRef.nativeElement, 'highlighted');
    }
  }
}
