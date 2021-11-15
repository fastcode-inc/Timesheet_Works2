import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IRolepermission } from '../irolepermission';
import { RolepermissionService } from '../rolepermission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RolepermissionNewComponent } from '../new/rolepermission-new.component';
import { BaseListComponent, ListColumnType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { PermissionService } from 'src/app/admin/user-management/permission/permission.service';
import { RoleService } from 'src/app/admin/user-management/role/role.service';

@Component({
  selector: 'app-rolepermission-list',
  templateUrl: './rolepermission-list.component.html',
  styleUrls: ['./rolepermission-list.component.scss'],
})
export class RolepermissionListComponent extends BaseListComponent<IRolepermission> implements OnInit {
  title = 'Rolepermission';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public rolepermissionService: RolepermissionService,
    public errorService: ErrorService,
    public permissionService: PermissionService,
    public roleService: RoleService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(router, route, dialog, global, changeDetectorRefs, pickerDialogService, rolepermissionService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Rolepermission';
    this.setAssociation();
    this.setColumns();
    this.primaryKeys = ['permissionId', 'roleId'];
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
        url: 'rolepermissions',
        listColumn: 'permission',
        label: 'permission',
      },
      {
        column: [
          {
            key: 'roleId',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        descriptiveField: 'roleDescriptiveField',
        referencedDescriptiveField: 'displayName',
        service: this.roleService,
        associatedObj: undefined,
        table: 'role',
        type: 'ManyToOne',
        url: 'rolepermissions',
        listColumn: 'role',
        label: 'role',
      },
    ];
  }

  setColumns() {
    this.columns = [
      {
        column: 'permissionDescriptiveField',
        searchColumn: 'permission',
        label: 'permission',
        sort: true,
        filter: true,
        type: ListColumnType.String,
      },
      {
        column: 'roleDescriptiveField',
        searchColumn: 'role',
        label: 'role',
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
      comp = RolepermissionNewComponent;
    }
    super.addNew(comp);
  }
}
