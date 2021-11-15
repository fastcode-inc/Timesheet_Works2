import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ITimeofftype } from '../itimeofftype';
import { TimeofftypeService } from '../timeofftype.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TimeofftypeNewComponent } from '../new/timeofftype-new.component';
import { BaseListComponent, ListColumnType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

@Component({
  selector: 'app-timeofftype-list',
  templateUrl: './timeofftype-list.component.html',
  styleUrls: ['./timeofftype-list.component.scss'],
})
export class TimeofftypeListComponent extends BaseListComponent<ITimeofftype> implements OnInit {
  title = 'Timeofftype';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public timeofftypeService: TimeofftypeService,
    public errorService: ErrorService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(router, route, dialog, global, changeDetectorRefs, pickerDialogService, timeofftypeService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Timeofftype';
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
        column: 'typename',
        searchColumn: 'typename',
        label: 'typename',
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
      comp = TimeofftypeNewComponent;
    }
    super.addNew(comp);
  }
}
