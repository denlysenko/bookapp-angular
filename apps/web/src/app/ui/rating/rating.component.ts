import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const RATING_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RatingComponent),
  multi: true
};

@Component({
  selector: 'ba-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [RATING_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements ControlValueAccessor, OnInit {
  @Output() onHover: EventEmitter<number> = new EventEmitter();
  @Output() onLeave: EventEmitter<number> = new EventEmitter();

  onChange: (_: any) => {};
  onTouched: (_: any) => {};

  range: any[];
  value: number;

  private preValue: number;
  private max = 5;

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngOnInit() {
    this.range = this.buildTemplateObjects(this.max);
  }

  writeValue(value: number) {
    if (value % 1 !== value) {
      this.value = Math.round(value);
      this.preValue = value;
      this.changeDetection.markForCheck();

      return;
    }

    this.preValue = value;
    this.value = value;
    this.changeDetection.markForCheck();
  }

  enter(value: number) {
    this.value = value;
    this.changeDetection.markForCheck();
    this.onHover.emit(value);
  }

  reset() {
    this.value = this.preValue;
    this.changeDetection.markForCheck();
    this.onLeave.emit(this.value);
  }

  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this.onTouched = fn;
  }

  rate(value: number) {
    if (value >= 0 && value <= this.range.length) {
      this.writeValue(value);
      this.onChange(value);
    }
  }

  private buildTemplateObjects(max: number): any[] {
    const result: any[] = [];
    for (let i = 0; i < max; i++) {
      result.push({
        index: i
      });
    }

    return result;
  }
}
