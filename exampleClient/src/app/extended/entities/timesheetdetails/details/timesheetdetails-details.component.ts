import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TimesheetdetailsExtendedService } from '../timesheetdetails.service';

import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';

import { TaskExtendedService } from 'src/app/extended/entities/task/task.service';
import { TimeofftypeExtendedService } from 'src/app/extended/entities/timeofftype/timeofftype.service';
import { TimesheetExtendedService } from 'src/app/extended/entities/timesheet/timesheet.service';

import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { TimesheetdetailsDetailsComponent } from 'src/app/entities/timesheetdetails/index';

@Component({
  selector: 'app-timesheetdetails-details',
  templateUrl: './timesheetdetails-details.component.html',
  styleUrls: ['./timesheetdetails-details.component.scss'],
})
export class TimesheetdetailsDetailsExtendedComponent extends TimesheetdetailsDetailsComponent implements OnInit {
  title: string = 'Timesheetdetails';
  parentUrl: string = 'timesheetdetails';
  //roles: IRole[];
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public timesheetdetailsExtendedService: TimesheetdetailsExtendedService,
    public pickerDialogService: PickerDialogService,
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
      timesheetdetailsExtendedService,
      pickerDialogService,
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
