import { Component, OnInit, Inject } from '@angular/core';
import { UsertaskExtendedService } from '../usertask.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TaskExtendedService } from 'src/app/extended/entities/task/task.service';
import { UsersExtendedService } from 'src/app/extended/admin/user-management/users/users.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { UsertaskNewComponent } from 'src/app/entities/usertask/index';

@Component({
  selector: 'app-usertask-new',
  templateUrl: './usertask-new.component.html',
  styleUrls: ['./usertask-new.component.scss'],
})
export class UsertaskNewExtendedComponent extends UsertaskNewComponent implements OnInit {
  title: string = 'New Usertask';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UsertaskNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public usertaskExtendedService: UsertaskExtendedService,
    public errorService: ErrorService,
    public taskExtendedService: TaskExtendedService,
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
      usertaskExtendedService,
      errorService,
      taskExtendedService,
      usersExtendedService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
