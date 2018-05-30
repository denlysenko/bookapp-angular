import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [CoreModule, LayoutModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
