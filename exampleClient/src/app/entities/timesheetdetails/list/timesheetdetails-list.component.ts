import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ITimesheetdetails } from '../itimesheetdetails';
import { TimesheetdetailsService } from '../timesheetdetails.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TimesheetdetailsNewComponent } from '../new/timesheetdetails-new.component';
import { BaseListComponent, ListColumnType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { TaskService } from 'src/app/entities/task/task.service';
import { TimeofftypeService } from 'src/app/entities/timeofftype/timeofftype.service';
import { TimesheetService } from 'src/app/entities/timesheet/timesheet.service';

@Component({
  selector: 'app-timesheetdetails-list',
  templateUrl: './timesheetdetails-list.component.html',
  styleUrls: ['./timesheetdetails-list.component.scss'],
})
export class TimesheetdetailsListComponent extends BaseListComponent<ITimesheetdetails> implements OnInit {
  title = 'Timesheetdetails';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public timesheetdetailsService: TimesheetdetailsService,
    public errorService: ErrorService,
    public taskService: TaskService,
    public timeofftypeService: TimeofftypeService,
    public timesheetService: TimesheetService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      router,
      route,
      dialog,
      global,
      changeDetectorRefs,
      pickerDialogService,
      timesheetdetailsService,
      errorService
    );
  }

  ngOnInit() {
    this.entityName = 'Timesheetdetails';
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
            key: 'taskid',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        descriptiveField: 'taskDescriptiveField',
        referencedDescriptiveField: 'id',
        service: this.taskService,
        associatedObj: undefined,
        table: 'task',
        type: 'ManyToOne',
        url: 'timesheetdetails',
        listColumn: 'task',
        label: 'task',
      },
      {
        column: [
          {
            key: 'timeofftypeid',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        descriptiveField: 'timeofftypeDescriptiveField',
        referencedDescriptiveField: 'id',
        service: this.timeofftypeService,
        associatedObj: undefined,
        table: 'timeofftype',
        type: 'ManyToOne',
        url: 'timesheetdetails',
        listColumn: 'timeofftype',
        label: 'timeofftype',
      },
      {
        column: [
          {
            key: 'timesheetid',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        descriptiveField: 'timesheetDescriptiveField',
        referencedDescriptiveField: 'id',
        service: this.timesheetService,
        associatedObj: undefined,
        table: 'timesheet',
        type: 'ManyToOne',
        url: 'timesheetdetails',
        listColumn: 'timesheet',
        label: 'timesheet',
      },
    ];
  }

  setColumns() {
    this.columns = [
      {
        column: 'workdate',
        searchColumn: 'workdate',
        label: 'workdate',
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
        column: 'hours',
        searchColumn: 'hours',
        label: 'hours',
        sort: true,
        filter: true,
        type: ListColumnType.Number,
      },
      {
        column: 'taskDescriptiveField',
        searchColumn: 'task',
        label: 'task',
        sort: true,
        filter: true,
        type: ListColumnType.String,
      },
      {
        column: 'timeofftypeDescriptiveField',
        searchColumn: 'timeofftype',
        label: 'timeofftype',
        sort: true,
        filter: true,
        type: ListColumnType.String,
      },
      {
        column: 'timesheetDescriptiveField',
        searchColumn: 'timesheet',
        label: 'timesheet',
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
      comp = TimesheetdetailsNewComponent;
    }
    super.addNew(comp);
  }
}
