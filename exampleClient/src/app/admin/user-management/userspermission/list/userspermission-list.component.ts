import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IUserspermission } from '../iuserspermission';
import { UserspermissionService } from '../userspermission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserspermissionNewComponent } from '../new/userspermission-new.component';
import { BaseListComponent, ListColumnType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { PermissionService } from 'src/app/admin/user-management/permission/permission.service';
import { UsersService } from 'src/app/admin/user-management/users/users.service';

@Component({
  selector: 'app-userspermission-list',
  templateUrl: './userspermission-list.component.html',
  styleUrls: ['./userspermission-list.component.scss'],
})
export class UserspermissionListComponent extends BaseListComponent<IUserspermission> implements OnInit {
  title = 'Userspermission';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public userspermissionService: UserspermissionService,
    public errorService: ErrorService,
    public permissionService: PermissionService,
    public usersService: UsersService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(router, route, dialog, global, changeDetectorRefs, pickerDialogService, userspermissionService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Userspermission';
    this.setAssociation();
    this.setColumns();
    this.primaryKeys = ['permissionId', 'usersId'];
    super.ngOnInit();
  }

  setAssociation() {
    this.associations = [
      {
        column: [
          {
            key: 'permissionId',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        descriptiveField: 'permissionDescriptiveField',
        referencedDescriptiveField: 'displayName',
        service: this.permissionService,
        associatedObj: undefined,
        table: 'permission',
        type: 'ManyToOne',
        url: 'Userspermissions',
        listColumn: 'permission',
        label: 'permission',
      },
      {
        column: [
          {
            key: 'usersId',
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
        url: 'userspermissions',
        listColumn: 'users',
        label: 'users',
      },
    ];
  }

  setColumns() {
    this.columns = [
      {
        column: 'revoked',
        searchColumn: 'revoked',
        label: 'revoked',
        sort: true,
        filter: true,
        type: ListColumnType.Boolean,
      },
      {
        column: 'permissionDescriptiveField',
        searchColumn: 'permission',
        label: 'permission',
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
      comp = UserspermissionNewComponent;
    }
    super.addNew(comp);
  }
}
