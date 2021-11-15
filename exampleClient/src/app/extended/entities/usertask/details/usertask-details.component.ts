import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { UsertaskExtendedService } from '../usertask.service';

import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';

import { TaskExtendedService } from 'src/app/extended/entities/task/task.service';
import { UsersExtendedService } from 'src/app/extended/admin/user-management/users/users.service';

import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { UsertaskDetailsComponent } from 'src/app/entities/usertask/index';

@Component({
  selector: 'app-usertask-details',
  templateUrl: './usertask-details.component.html',
  styleUrls: ['./usertask-details.component.scss'],
})
export class UsertaskDetailsExtendedComponent extends UsertaskDetailsComponent implements OnInit {
  title: string = 'Usertask';
  parentUrl: string = 'usertask';
  //roles: IRole[];
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public usertaskExtendedService: UsertaskExtendedService,
    public pickerDialogService: PickerDialogService,
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
      usertaskExtendedService,
      pickerDialogService,
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
