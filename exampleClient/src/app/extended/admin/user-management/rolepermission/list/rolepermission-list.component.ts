import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';

import { RolepermissionExtendedService } from '../rolepermission.service';
import { RolepermissionNewExtendedComponent } from '../new/rolepermission-new.component';
import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';

import { PermissionExtendedService } from 'src/app/extended/admin/user-management/permission/permission.service';
import { RoleExtendedService } from 'src/app/extended/admin/user-management/role/role.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { RolepermissionListComponent } from 'src/app/admin/user-management/rolepermission/index';

@Component({
  selector: 'app-rolepermission-list',
  templateUrl: './rolepermission-list.component.html',
  styleUrls: ['./rolepermission-list.component.scss'],
})
export class RolepermissionListExtendedComponent extends RolepermissionListComponent implements OnInit {
  title: string = 'Rolepermission';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public rolepermissionService: RolepermissionExtendedService,
    public errorService: ErrorService,
    public permissionService: PermissionExtendedService,
    public roleService: RoleExtendedService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      router,
      route,
      global,
      dialog,
      changeDetectorRefs,
      pickerDialogService,
      rolepermissionService,
      errorService,
      permissionService,
      roleService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  addNew() {
    super.addNew(RolepermissionNewExtendedComponent);
  }
}
