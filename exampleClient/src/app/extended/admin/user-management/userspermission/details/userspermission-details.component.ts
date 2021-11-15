import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { UserspermissionExtendedService } from '../userspermission.service';

import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';

import { PermissionExtendedService } from 'src/app/extended/admin/user-management/permission/permission.service';
import { UsersExtendedService } from 'src/app/extended/admin/user-management/users/users.service';

import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { UserspermissionDetailsComponent } from 'src/app/admin/user-management/userspermission/index';

@Component({
  selector: 'app-userspermission-details',
  templateUrl: './userspermission-details.component.html',
  styleUrls: ['./userspermission-details.component.scss'],
})
export class UserspermissionDetailsExtendedComponent extends UserspermissionDetailsComponent implements OnInit {
  title: string = 'Userspermission';
  parentUrl: string = 'userspermission';
  //roles: IRole[];
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public userspermissionExtendedService: UserspermissionExtendedService,
    public pickerDialogService: PickerDialogService,
    public errorService: ErrorService,
    public permissionExtendedService: PermissionExtendedService,
    public usersExtendedService: UsersExtendedService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      formBuilder,
      router,
      route,
      dialog,
      userspermissionExtendedService,
      pickerDialogService,
      errorService,
      permissionExtendedService,
      usersExtendedService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
