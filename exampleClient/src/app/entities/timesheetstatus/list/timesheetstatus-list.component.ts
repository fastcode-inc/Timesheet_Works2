import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ITimesheetstatus } from '../itimesheetstatus';
import { TimesheetstatusService } from '../timesheetstatus.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TimesheetstatusNewComponent } from '../new/timesheetstatus-new.component';
import { BaseListComponent, ListColumnType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

@Component({
  selector: 'app-timesheetstatus-list',
  templateUrl: './timesheetstatus-list.component.html',
  styleUrls: ['./timesheetstatus-list.component.scss'],
})
export class TimesheetstatusListComponent extends BaseListComponent<ITimesheetstatus> implements OnInit {
  title = 'Timesheetstatus';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public timesheetstatusService: TimesheetstatusService,
    public errorService: ErrorService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(router, route, dialog, global, changeDetectorRefs, pickerDialogService, timesheetstatusService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Timesheetstatus';
    this.setAssociation();
    this.setColumns();
    this.primaryKeys = ['id'];
    super.ngOnInit();
  }

  setAssociation() {
    this.associations = [];
  }

  setColumns() {
    this.columns = [
      {
        column: 'statusname',
        searchColumn: 'statusname',
        label: 'statusname',
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
      comp = TimesheetstatusNewComponent;
    }
    super.addNew(comp);
  }
}
