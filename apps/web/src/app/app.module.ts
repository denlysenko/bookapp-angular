import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [CoreModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
