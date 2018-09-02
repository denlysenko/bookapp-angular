import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { FileSelectorBaseComponent } from '@web/modules/core/base';
import { UploadService } from '@web/modules/core/services';

@Component({
  selector: 'ba-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
  providers: [UploadService]
})
export class FileSelectorComponent extends FileSelectorBaseComponent {
  constructor(
    protected uploadService: UploadService,
    private dialogRef: MatDialogRef<FileSelectorComponent>
  ) {
    super();
  }

  save() {
    if (!this.imageChangedEvent) {
      return;
    }

    this.upload(this.imageChangedEvent.target.files[0]).subscribe(
      res => {
        this.dialogRef.close(res.publicUrl);
      },
      () => (this.imageChangedEvent = null)
    );
  }
}
