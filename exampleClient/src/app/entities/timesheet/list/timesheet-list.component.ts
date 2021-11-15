import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ITimesheet } from '../itimesheet';
import { TimesheetService } from '../timesheet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TimesheetNewComponent } from '../new/timesheet-new.component';
import { BaseListComponent, ListColumnType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { TimesheetstatusService } from 'src/app/entities/timesheetstatus/timesheetstatus.service';
import { UsersService } from 'src/app/admin/user-management/users/users.service';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.scss'],
})
export class TimesheetListComponent extends BaseListComponent<ITimesheet> implements OnInit {
  title = 'Timesheet';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public timesheetService: TimesheetService,
    public errorService: ErrorService,
    public timesheetstatusService: TimesheetstatusService,
    public usersService: UsersService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(router, route, dialog, global, changeDetectorRefs, pickerDialogService, timesheetService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Timesheet';
    this.setAssociation();
    this.setColumns();
    this.primaryKeys = ['id'];
    super.ngOnInit();
  }

  setAssociation() {
    this.associations = [
      {
        column: [
          {
            key: 'timesheetstatusid',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        descriptiveField: 'timesheetstatusDescriptiveField',
        referencedDescriptiveField: 'id',
        service: this.timesheetstatusService,
        associatedObj: undefined,
        table: 'timesheetstatus',
        type: 'ManyToOne',
        url: 'timesheets',
        listColumn: 'timesheetstatus',
        label: 'timesheetstatus',
      },
      {
        column: [
          {
            key: 'userid',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        descriptiveField: 'usersDescriptiveField',
        referencedDescriptiveField: 'id',
        service: this.usersService,
        associatedObj: undefined,
        table: 'users',
        type: 'ManyToOne',
        url: 'timesheets',
        listColumn: 'users',
        label: 'users',
      },
    ];
  }

  setColumns() {
    this.columns = [
      {
        column: 'periodstartingdate',
        searchColumn: 'periodstartingdate',
        label: 'periodstartingdate',
        sort: true,
        filter: true,
        type: ListColumnType.Date,
      },
      {
        column: 'periodendingdate',
        searchColumn: 'periodendingdate',
        label: 'periodendingdate',
        sort: true,
        filter: true,
        type: ListColumnType.Date,
      },
      {
        column: 'notes',
        searchColumn: 'notes',
        label: 'notes',
        sort: true,
        filter: true,
        type: ListColumnType.String,
      },
      {
        column: 'id',
        searchColumn: 'id',
        label: 'id',
        sort: true,
        filter: true,
        type: ListColumnType.Number,
      },
      {
        column: 'timesheetstatusDescriptiveField',
        searchColumn: 'timesheetstatus',
        label: 'timesheetstatus',
        sort: true,
        filter: true,
        type: ListColumnType.String,
      },
      {
        column: 'usersDescriptiveField',
        searchColumn: 'users',
        label: 'users',
        sort: true,
        filter: true,
        type: ListColumnType.String,
      },
      {
        column: 'actions',
        label: 'Actions',
        sort: false,
        filter: false,
        type: ListColumnType.String,
      },
    ];
    this.selectedColumns = this.columns;
    this.displayedColumns = this.columns.map((obj) => {
      return obj.column;
    });
  }
  addNew(comp: any) {
    if (!comp) {
      comp = TimesheetNewComponent;
    }
    super.addNew(comp);
  }
}
