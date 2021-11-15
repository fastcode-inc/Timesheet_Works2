import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ICustomer } from '../icustomer';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerNewComponent } from '../new/customer-new.component';
import { BaseListComponent, ListColumnType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent extends BaseListComponent<ICustomer> implements OnInit {
  title = 'Customer';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public customerService: CustomerService,
    public errorService: ErrorService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(router, route, dialog, global, changeDetectorRefs, pickerDialogService, customerService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Customer';
    this.setAssociation();
    this.setColumns();
    this.primaryKeys = ['customerid'];
    super.ngOnInit();
  }

  setAssociation() {
    this.associations = [];
  }

  setColumns() {
    this.columns = [
      {
        column: 'name',
        searchColumn: 'name',
        label: 'name',
        sort: true,
        filter: true,
        type: ListColumnType.String,
      },
      {
        column: 'isactive',
        searchColumn: 'isactive',
        label: 'isactive',
        sort: true,
        filter: true,
        type: ListColumnType.Boolean,
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
        column: 'customerid',
        searchColumn: 'customerid',
        label: 'customerid',
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
      comp = CustomerNewComponent;
    }
    super.addNew(comp);
  }
}
