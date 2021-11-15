import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IUsersrole } from '../iusersrole';
import { UsersroleService } from '../usersrole.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersroleNewComponent } from '../new/usersrole-new.component';
import { BaseListComponent, ListColumnType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { RoleService } from 'src/app/admin/user-management/role/role.service';
import { UsersService } from 'src/app/admin/user-management/users/users.service';

@Component({
  selector: 'app-usersrole-list',
  templateUrl: './usersrole-list.component.html',
  styleUrls: ['./usersrole-list.component.scss'],
})
export class UsersroleListComponent extends BaseListComponent<IUsersrole> implements OnInit {
  title = 'Usersrole';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public usersroleService: UsersroleService,
    public errorService: ErrorService,
    public roleService: RoleService,
    public usersService: UsersService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(router, route, dialog, global, changeDetectorRefs, pickerDialogService, usersroleService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Usersrole';
    this.setAssociation();
    this.setColumns();
    this.primaryKeys = ['roleId', 'usersId'];
    super.ngOnInit();
  }

  setAssociation() {
    this.associations = [
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
        url: 'Usersroles',
        listColumn: 'role',
        label: 'role',
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
        url: 'usersroles',
        listColumn: 'users',
        label: 'users',
      },
    ];
  }

  setColumns() {
    this.columns = [
      {
        column: 'roleDescriptiveField',
        searchColumn: 'role',
        label: 'role',
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
      comp = UsersroleNewComponent;
    }
    super.addNew(comp);
  }
}
