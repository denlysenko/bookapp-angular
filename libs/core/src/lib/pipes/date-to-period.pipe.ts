import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToPeriod'
})
export class DateToPeriodPipe implements PipeTransform {
  transform(value: string): string {
    const diff = Math.ceil((Date.now() - new Date(value).getTime()) / 1000);

    if (diff < 60) {
      return `${diff} minutes ago`;
    }

    if (diff < 86400) {
      return `${Math.floor(diff / 60)} hours ago`;
    }

    if (diff >= 86400) {
      return `${Math.floor(diff / 86400)} days ago`;
    }
  }
}
