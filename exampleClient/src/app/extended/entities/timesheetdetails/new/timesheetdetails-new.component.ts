import { Component, OnInit, Inject } from '@angular/core';
import { TimesheetdetailsExtendedService } from '../timesheetdetails.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TaskExtendedService } from 'src/app/extended/entities/task/task.service';
import { TimeofftypeExtendedService } from 'src/app/extended/entities/timeofftype/timeofftype.service';
import { TimesheetExtendedService } from 'src/app/extended/entities/timesheet/timesheet.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { TimesheetdetailsNewComponent } from 'src/app/entities/timesheetdetails/index';

@Component({
  selector: 'app-timesheetdetails-new',
  templateUrl: './timesheetdetails-new.component.html',
  styleUrls: ['./timesheetdetails-new.component.scss'],
})
export class TimesheetdetailsNewExtendedComponent extends TimesheetdetailsNewComponent implements OnInit {
  title: string = 'New Timesheetdetails';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TimesheetdetailsNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public timesheetdetailsExtendedService: TimesheetdetailsExtendedService,
    public errorService: ErrorService,
    public taskExtendedService: TaskExtendedService,
    public timeofftypeExtendedService: TimeofftypeExtendedService,
    public timesheetExtendedService: TimesheetExtendedService,
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
      timesheetdetailsExtendedService,
      errorService,
      taskExtendedService,
      timeofftypeExtendedService,
      timesheetExtendedService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
