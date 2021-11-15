import { Component, OnInit, Inject } from '@angular/core';
import { UserspermissionExtendedService } from '../userspermission.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PermissionExtendedService } from 'src/app/extended/admin/user-management/permission/permission.service';
import { UsersExtendedService } from 'src/app/extended/admin/user-management/users/users.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { UserspermissionNewComponent } from 'src/app/admin/user-management/userspermission/index';

@Component({
  selector: 'app-userspermission-new',
  templateUrl: './userspermission-new.component.html',
  styleUrls: ['./userspermission-new.component.scss'],
})
export class UserspermissionNewExtendedComponent extends UserspermissionNewComponent implements OnInit {
  title: string = 'New Userspermission';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserspermissionNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public userspermissionExtendedService: UserspermissionExtendedService,
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
      dialogRef,
      data,
      pickerDialogService,
      userspermissionExtendedService,
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
