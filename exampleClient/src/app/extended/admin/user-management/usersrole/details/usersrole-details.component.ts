import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { UsersroleExtendedService } from '../usersrole.service';

import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';

import { RoleExtendedService } from 'src/app/extended/admin/user-management/role/role.service';
import { UsersExtendedService } from 'src/app/extended/admin/user-management/users/users.service';

import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { UsersroleDetailsComponent } from 'src/app/admin/user-management/usersrole/index';

@Component({
  selector: 'app-usersrole-details',
  templateUrl: './usersrole-details.component.html',
  styleUrls: ['./usersrole-details.component.scss'],
})
export class UsersroleDetailsExtendedComponent extends UsersroleDetailsComponent implements OnInit {
  title: string = 'Usersrole';
  parentUrl: string = 'usersrole';
  //roles: IRole[];
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public usersroleExtendedService: UsersroleExtendedService,
    public pickerDialogService: PickerDialogService,
    public errorService: ErrorService,
    public roleExtendedService: RoleExtendedService,
    public usersExtendedService: UsersExtendedService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      formBuilder,
      router,
      route,
      dialog,
      usersroleExtendedService,
      pickerDialogService,
      errorService,
      roleExtendedService,
      usersExtendedService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
