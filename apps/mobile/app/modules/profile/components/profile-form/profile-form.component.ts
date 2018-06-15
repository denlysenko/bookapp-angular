import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { map } from 'rxjs/operators';

import { User } from '@bookapp-angular/auth-core';
import { FeedbackPlatformService, UploadService } from '@bookapp-angular/core';
import { ProfileFormBaseComponent } from '@bookapp-angular/profile-core';
import { dataURIToBlob } from '@bookapp-angular/utils';
import { ImageSource } from 'image-source';
import { requestPermissions, takePicture } from 'nativescript-camera';
import { ImageCropper } from 'nativescript-imagecropper';
import { getViewById } from 'ui/core/view';
import { Page } from 'ui/page';

import { profileMetadata, ProfileViewModel } from '../../models';

@Component({
  moduleId: module.id,
  selector: 'ba-profile-form',
  templateUrl: 'profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  providers: [UploadService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent extends ProfileFormBaseComponent {
  metadata = profileMetadata;
  profile: ProfileViewModel;
  imageCropper: ImageCropper;
  source: ImageSource;

  @Input()
  set user(value: User) {
    if (value) {
      this._user = value;
      this.initForm();
    }
  }
  get user(): User {
    return this._user;
  }

  @Output() backTapped = new EventEmitter<void>();

  private _user: User;

  constructor(
    private page: Page,
    protected feedbackService: FeedbackPlatformService,
    private uploadService: UploadService
  ) {
    super();
    this.imageCropper = new ImageCropper();
    this.source = new ImageSource();
  }

  goBack() {
    this.backTapped.emit();
  }

  submit() {
    this.onFormSubmit.emit({ id: this.user.id, user: this.profile });
  }

  takePicture() {
    requestPermissions().then(() => {
      takePicture({
        width: 300,
        height: 300,
        keepAspectRatio: true
      }).then((imageAsset: any) => {
        this.source.fromAsset(imageAsset).then(imageSource => {
          this.imageCropper
            .show(imageSource, { width: 300, height: 300, lockSquare: true })
            .then(args => {
              if (args.image !== null) {
                this.uploadService
                  .upload(dataURIToBlob(args.image))
                  .pipe(map(res => JSON.parse(res)))
                  .subscribe(
                    res => {
                      this.onFormSubmit.emit({
                        id: this.user.id,
                        user: { avatar: res.Location }
                      });
                    },
                    err => {
                      console.dir(err);
                    }
                  );
              }
            });
        });
      });
    });
  }

  private initForm() {
    this.profile = new ProfileViewModel(
      this.user.firstName,
      this.user.lastName,
      this.user.email
    );
  }

  protected handleError(err: any) {
    if (err.errors) {
      const error = err.errors;
      Object.keys(error).forEach(key => {
        const dataform: any = getViewById(this.page, 'profileForm');
        const formControl = dataform.getPropertyByName(key);
        if (formControl) {
          formControl.errorMessage = error[key].message;
          dataform.notifyValidated(key, false);
        }
      });
    } else if (err.message && err.message.message) {
      this.feedbackService.error(err.message.message);
    }
  }
}
