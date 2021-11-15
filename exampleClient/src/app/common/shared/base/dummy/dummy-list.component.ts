import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IDummy } from './idummy';
import { DummyService, ParentService } from './dummy.service';
import { DummyNewComponent } from './dummy-new.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { ListColumnType } from 'src/app/common/shared/models/ilistColumn';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { Globals } from 'src/app/core/services/globals';

@Component({
  selector: 'app-userrole-list',
  templateUrl: './dummy-list.component.html',
})
export class DummyListComponent extends BaseListComponent<IDummy> implements OnInit {
  title: string = 'Dummy';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public dataService: DummyService,
    public parentService: ParentService,
    public errorService: ErrorService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(router, route, dialog, global, changeDetectorRefs, pickerDialogService, dataService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Dummy';
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
            key: 'parentId',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        table: 'parent',
        type: 'ManyToOne',
        service: this.parentService,
        descriptiveField: 'parentDescriptiveField',
        referencedDescriptiveField: 'name',
        url: 'dummies',
        listColumn: 'parent',
        label: 'parent',
      },
    ];
    this.selectedAssociation = this.associations[0];
  }

  setColumns() {
    this.columns = [
      {
        column: 'Parent',
        label: 'Parent',
        sort: false,
        filter: false,
        type: ListColumnType.String,
      },
      {
        column: 'id',
        label: 'Id',
        sort: false,
        filter: false,
        type: ListColumnType.Number,
      },
      {
        column: 'name',
        label: 'Name',
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

  addNew() {
    super.addNew(DummyNewComponent);
  }
}
