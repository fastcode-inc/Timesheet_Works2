import { Component, OnInit, Inject } from '@angular/core';
import { ProjectExtendedService } from '../project.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CustomerExtendedService } from 'src/app/extended/entities/customer/customer.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { ProjectNewComponent } from 'src/app/entities/project/index';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss'],
})
export class ProjectNewExtendedComponent extends ProjectNewComponent implements OnInit {
  title: string = 'New Project';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public projectExtendedService: ProjectExtendedService,
    public errorService: ErrorService,
    public customerExtendedService: CustomerExtendedService,
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
      projectExtendedService,
      errorService,
      customerExtendedService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
