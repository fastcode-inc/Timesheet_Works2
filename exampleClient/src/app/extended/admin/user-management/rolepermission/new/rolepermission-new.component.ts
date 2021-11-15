import { Component, OnInit, Inject } from '@angular/core';
import { RolepermissionExtendedService } from '../rolepermission.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PermissionExtendedService } from 'src/app/extended/admin/user-management/permission/permission.service';
import { RoleExtendedService } from 'src/app/extended/admin/user-management/role/role.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { RolepermissionNewComponent } from 'src/app/admin/user-management/rolepermission/index';

@Component({
  selector: 'app-rolepermission-new',
  templateUrl: './rolepermission-new.component.html',
  styleUrls: ['./rolepermission-new.component.scss'],
})
export class RolepermissionNewExtendedComponent extends RolepermissionNewComponent implements OnInit {
  title: string = 'New Rolepermission';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RolepermissionNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public rolepermissionExtendedService: RolepermissionExtendedService,
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
      dialogRef,
      data,
      pickerDialogService,
      rolepermissionExtendedService,
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
