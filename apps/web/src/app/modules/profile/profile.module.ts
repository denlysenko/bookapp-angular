import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

import { ProfileCoreModule } from '@bookapp-angular/profile-core';
import { ImageSelectorComponent, ImageSelectorModule } from '@web/ui/image-selector';

import { components } from './components';
import { containers } from './containers';
import { routes } from './profile.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ProfileCoreModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ImageSelectorModule
  ],
  declarations: [...containers, ...components],
  entryComponents: [ImageSelectorComponent]
})
export class ProfileModule {}
