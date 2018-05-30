import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [CoreModule, MatToolbarModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
