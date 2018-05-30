import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { components } from './components';
import { containers } from './containers';

@NgModule({
  imports: [RouterModule.forRoot([]), MatToolbarModule],
  declarations: [...containers, ...components],
  exports: [...containers]
})
export class LayoutModule {}
