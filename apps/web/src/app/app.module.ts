import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './pages/auth/auth.module';

@NgModule({
  imports: [CoreModule, RouterModule.forRoot(routes), AuthModule, LayoutModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
