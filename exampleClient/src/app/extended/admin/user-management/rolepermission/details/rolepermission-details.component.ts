import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { RolepermissionExtendedService } from '../rolepermission.service';

import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';

import { PermissionExtendedService } from 'src/app/extended/admin/user-management/permission/permission.service';
import { RoleExtendedService } from 'src/app/extended/admin/user-management/role/role.service';

import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { RolepermissionDetailsComponent } from 'src/app/admin/user-management/rolepermission/index';

@Component({
  selector: 'app-rolepermission-details',
  templateUrl: './rolepermission-details.component.html',
  styleUrls: ['./rolepermission-details.component.scss'],
})
export class RolepermissionDetailsExtendedComponent extends RolepermissionDetailsComponent implements OnInit {
  title: string = 'Rolepermission';
  parentUrl: string = 'rolepermission';
  //roles: IRole[];
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public rolepermissionExtendedService: RolepermissionExtendedService,
    public pickerDialogService: PickerDialogService,
    public errorService: ErrorService,
    public permissionExtendedService: PermissionExtendedService,
    public roleExtendedService: RoleExtendedService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      formBuilder,
      router,
      route,
      dialog,
      rolepermissionExtendedService,
      pickerDialogService,
      errorService,
      permissionExtendedService,
      roleExtendedService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
