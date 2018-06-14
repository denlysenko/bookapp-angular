import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropDirective } from './drop.directive';

@NgModule({
  imports: [CommonModule],
  exports: [DropDirective],
  declarations: [DropDirective]
})
export class DndModule {}
