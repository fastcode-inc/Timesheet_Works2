import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TimesheetExtendedService } from '../timesheet.service';

import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';

import { TimesheetstatusExtendedService } from 'src/app/extended/entities/timesheetstatus/timesheetstatus.service';
import { UsersExtendedService } from 'src/app/extended/admin/user-management/users/users.service';

import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { TimesheetDetailsComponent } from 'src/app/entities/timesheet/index';

@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.scss'],
})
export class TimesheetDetailsExtendedComponent extends TimesheetDetailsComponent implements OnInit {
  title: string = 'Timesheet';
  parentUrl: string = 'timesheet';
  //roles: IRole[];
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public timesheetExtendedService: TimesheetExtendedService,
    public pickerDialogService: PickerDialogService,
    public errorService: ErrorService,
    public timesheetstatusExtendedService: TimesheetstatusExtendedService,
    public usersExtendedService: UsersExtendedService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      formBuilder,
      router,
      route,
      dialog,
      timesheetExtendedService,
      pickerDialogService,
      errorService,
      timesheetstatusExtendedService,
      usersExtendedService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
