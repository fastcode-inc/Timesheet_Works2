import { Component, OnInit, Inject } from '@angular/core';
import { TaskExtendedService } from '../task.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProjectExtendedService } from 'src/app/extended/entities/project/project.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { TaskNewComponent } from 'src/app/entities/task/index';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.scss'],
})
export class TaskNewExtendedComponent extends TaskNewComponent implements OnInit {
  title: string = 'New Task';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TaskNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public taskExtendedService: TaskExtendedService,
    public errorService: ErrorService,
    public projectExtendedService: ProjectExtendedService,
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
      taskExtendedService,
      errorService,
      projectExtendedService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
