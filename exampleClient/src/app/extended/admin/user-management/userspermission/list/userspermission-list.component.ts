import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';

import { UserspermissionExtendedService } from '../userspermission.service';
import { UserspermissionNewExtendedComponent } from '../new/userspermission-new.component';
import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';

import { PermissionExtendedService } from 'src/app/extended/admin/user-management/permission/permission.service';
import { UsersExtendedService } from 'src/app/extended/admin/user-management/users/users.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { UserspermissionListComponent } from 'src/app/admin/user-management/userspermission/index';

@Component({
  selector: 'app-userspermission-list',
  templateUrl: './userspermission-list.component.html',
  styleUrls: ['./userspermission-list.component.scss'],
})
export class UserspermissionListExtendedComponent extends UserspermissionListComponent implements OnInit {
  title: string = 'Userspermission';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public userspermissionService: UserspermissionExtendedService,
    public errorService: ErrorService,
    public permissionService: PermissionExtendedService,
    public usersService: UsersExtendedService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      router,
      route,
      global,
      dialog,
      changeDetectorRefs,
      pickerDialogService,
      userspermissionService,
      errorService,
      permissionService,
      usersService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  addNew() {
    super.addNew(UserspermissionNewExtendedComponent);
  }
}
