import { Component, OnInit, Inject } from '@angular/core';
import { TimeofftypeExtendedService } from '../timeofftype.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { TimeofftypeNewComponent } from 'src/app/entities/timeofftype/index';

@Component({
  selector: 'app-timeofftype-new',
  templateUrl: './timeofftype-new.component.html',
  styleUrls: ['./timeofftype-new.component.scss'],
})
export class TimeofftypeNewExtendedComponent extends TimeofftypeNewComponent implements OnInit {
  title: string = 'New Timeofftype';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TimeofftypeNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public timeofftypeExtendedService: TimeofftypeExtendedService,
    public errorService: ErrorService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      formBuilder,
      router,
      route,
      dialog,
      dialogRef,
      data,
      pickerDialogService,
      timeofftypeExtendedService,
      errorService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
