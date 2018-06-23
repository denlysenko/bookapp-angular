import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { FileSelectorBaseComponent } from '@web/modules/core/base';
import { UploadService } from '@web/modules/core/services';

@Component({
  selector: 'ba-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
  providers: [UploadService]
})
export class FileSelectorComponent extends FileSelectorBaseComponent
  implements OnInit {
  constructor(
    protected uploadService: UploadService,
    private dialogRef: MatDialogRef<FileSelectorComponent>
  ) {
    super();
  }

  ngOnInit() {}
}
