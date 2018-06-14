import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

import { ProfileCoreModule } from '@bookapp-angular/profile-core';
import { DndModule } from '@bookapp-angular/ui';
import { ImageCropperModule } from 'ngx-image-cropper';

import { components } from './components';
import { AvatarSelectorComponent } from './components/avatar-selector/avatar-selector.component';
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
    MatDividerModule,
    DndModule,
    ImageCropperModule
  ],
  declarations: [...containers, ...components],
  entryComponents: [AvatarSelectorComponent]
})
export class ProfileModule {}
