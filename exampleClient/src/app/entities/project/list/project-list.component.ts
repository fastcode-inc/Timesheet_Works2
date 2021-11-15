import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IProject } from '../iproject';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectNewComponent } from '../new/project-new.component';
import { BaseListComponent, ListColumnType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { CustomerService } from 'src/app/entities/customer/customer.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent extends BaseListComponent<IProject> implements OnInit {
  title = 'Project';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public projectService: ProjectService,
    public errorService: ErrorService,
    public customerService: CustomerService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(router, route, dialog, global, changeDetectorRefs, pickerDialogService, projectService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Project';
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
            key: 'customerid',
            value: undefined,
            referencedkey: 'customerid',
          },
        ],
        isParent: false,
        descriptiveField: 'customerDescriptiveField',
        referencedDescriptiveField: 'customerid',
        service: this.customerService,
        associatedObj: undefined,
        table: 'customer',
        type: 'ManyToOne',
        url: 'projects',
        listColumn: 'customer',
        label: 'customer',
      },
    ];
  }

  setColumns() {
    this.columns = [
      {
        column: 'startdate',
        searchColumn: 'startdate',
        label: 'startdate',
        sort: true,
        filter: true,
        type: ListColumnType.Date,
      },
      {
        column: 'name',
        searchColumn: 'name',
        label: 'name',
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
        column: 'enddate',
        searchColumn: 'enddate',
        label: 'enddate',
        sort: true,
        filter: true,
        type: ListColumnType.Date,
      },
      {
        column: 'description',
        searchColumn: 'description',
        label: 'description',
        sort: true,
        filter: true,
        type: ListColumnType.String,
      },
      {
        column: 'customerDescriptiveField',
        searchColumn: 'customer',
        label: 'customer',
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
      comp = ProjectNewComponent;
    }
    super.addNew(comp);
  }
}
