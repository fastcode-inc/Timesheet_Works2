import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';

import { ProjectExtendedService } from '../project.service';
import { ProjectNewExtendedComponent } from '../new/project-new.component';
import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';

import { CustomerExtendedService } from 'src/app/extended/entities/customer/customer.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { ProjectListComponent } from 'src/app/entities/project/index';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListExtendedComponent extends ProjectListComponent implements OnInit {
  title: string = 'Project';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public projectService: ProjectExtendedService,
    public errorService: ErrorService,
    public customerService: CustomerExtendedService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      router,
      route,
      global,
      dialog,
      changeDetectorRefs,
      pickerDialogService,
      projectService,
      errorService,
      customerService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  addNew() {
    super.addNew(ProjectNewExtendedComponent);
  }
}
