import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from '@bookapp-angular/auth-core';
import { FeedbackPlatformService } from '@bookapp-angular/core';
import { ProfileFormBaseComponent } from '@bookapp-angular/profile-core';
import { knownFolders, path } from 'file-system';
import { ImageSource } from 'image-source';
import { requestPermissions, takePicture } from 'nativescript-camera';
import { ImageCropper } from 'nativescript-imagecropper';
import { isAndroid, isIOS } from 'tns-core-modules/platform';
import { getViewById } from 'ui/core/view';
import { Page } from 'ui/page';
import { UploadService } from '~/modules/core/services/upload.service';

import { profileMetadata, ProfileViewModel } from '../../models';

@Component({
  moduleId: module.id,
  selector: 'ba-profile-form',
  templateUrl: 'profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  providers: [UploadService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent extends ProfileFormBaseComponent
  implements AfterViewInit {
  metadata = profileMetadata;
  profile: ProfileViewModel;
  imageCropper: ImageCropper;
  source: ImageSource;
  progress$: Observable<number>;
  isUploading = false;
  dataform: any;

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
    this.progress$ = this.uploadService.progress$;
  }

  ngAfterViewInit() {
    this.dataform = getViewById(this.page, 'profileForm');
  }

  submit() {
    this.dataform.validateAll().then(result => {
      if (result) {
        this.onFormSubmit.emit({ id: this.user.id, user: this.profile });
      }
    });
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
                let localPath = null;

                if (isAndroid) {
                  localPath = args.image.android;
                }

                if (isIOS) {
                  const folder = knownFolders.documents();
                  const filePath = path.join(
                    folder.path,
                    `avatar_for_ba_${new Date().getTime()}.png`
                  );
                  args.image.saveToFile(filePath, 'png');

                  localPath = filePath;
                }

                if (localPath) {
                  this.isUploading = true;

                  this.uploadService
                    .upload(localPath)
                    .then(res => {
                      this.isUploading = false;
                      this.onFormSubmit.emit({
                        id: this.user.id,
                        user: { avatar: res.Location }
                      });
                    })
                    .catch(err => {
                      this.isUploading = false;
                      this.handleError({ message: { message: err.message } });
                    });
                }
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
        const formControl = this.dataform.getPropertyByName(key);
        if (formControl) {
          formControl.errorMessage = error[key].message;
          this.dataform.notifyValidated(key, false);
        }
      });
    } else if (err.message && err.message.message) {
      this.feedbackService.error(err.message.message);
    }
  }
}
