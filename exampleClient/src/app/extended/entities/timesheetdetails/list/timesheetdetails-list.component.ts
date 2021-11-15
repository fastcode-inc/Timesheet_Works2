import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';

import { TimesheetdetailsExtendedService } from '../timesheetdetails.service';
import { TimesheetdetailsNewExtendedComponent } from '../new/timesheetdetails-new.component';
import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';

import { TaskExtendedService } from 'src/app/extended/entities/task/task.service';
import { TimeofftypeExtendedService } from 'src/app/extended/entities/timeofftype/timeofftype.service';
import { TimesheetExtendedService } from 'src/app/extended/entities/timesheet/timesheet.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { TimesheetdetailsListComponent } from 'src/app/entities/timesheetdetails/index';

@Component({
  selector: 'app-timesheetdetails-list',
  templateUrl: './timesheetdetails-list.component.html',
  styleUrls: ['./timesheetdetails-list.component.scss'],
})
export class TimesheetdetailsListExtendedComponent extends TimesheetdetailsListComponent implements OnInit {
  title: string = 'Timesheetdetails';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public timesheetdetailsService: TimesheetdetailsExtendedService,
    public errorService: ErrorService,
    public taskService: TaskExtendedService,
    public timeofftypeService: TimeofftypeExtendedService,
    public timesheetService: TimesheetExtendedService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      router,
      route,
      global,
      dialog,
      changeDetectorRefs,
      pickerDialogService,
      timesheetdetailsService,
      errorService,
      taskService,
      timeofftypeService,
      timesheetService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  addNew() {
    super.addNew(TimesheetdetailsNewExtendedComponent);
  }
}
