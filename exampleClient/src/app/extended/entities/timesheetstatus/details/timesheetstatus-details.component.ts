import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TimesheetstatusExtendedService } from '../timesheetstatus.service';

import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';

import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { TimesheetstatusDetailsComponent } from 'src/app/entities/timesheetstatus/index';

@Component({
  selector: 'app-timesheetstatus-details',
  templateUrl: './timesheetstatus-details.component.html',
  styleUrls: ['./timesheetstatus-details.component.scss'],
})
export class TimesheetstatusDetailsExtendedComponent extends TimesheetstatusDetailsComponent implements OnInit {
  title: string = 'Timesheetstatus';
  parentUrl: string = 'timesheetstatus';
  //roles: IRole[];
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public timesheetstatusExtendedService: TimesheetstatusExtendedService,
    public pickerDialogService: PickerDialogService,
    public errorService: ErrorService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      formBuilder,
      router,
      route,
      dialog,
      timesheetstatusExtendedService,
      pickerDialogService,
      errorService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
