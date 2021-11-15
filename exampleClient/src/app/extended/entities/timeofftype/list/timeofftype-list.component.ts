import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';

import { TimeofftypeExtendedService } from '../timeofftype.service';
import { TimeofftypeNewExtendedComponent } from '../new/timeofftype-new.component';
import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';

import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { TimeofftypeListComponent } from 'src/app/entities/timeofftype/index';

@Component({
  selector: 'app-timeofftype-list',
  templateUrl: './timeofftype-list.component.html',
  styleUrls: ['./timeofftype-list.component.scss'],
})
export class TimeofftypeListExtendedComponent extends TimeofftypeListComponent implements OnInit {
  title: string = 'Timeofftype';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public timeofftypeService: TimeofftypeExtendedService,
    public errorService: ErrorService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      router,
      route,
      global,
      dialog,
      changeDetectorRefs,
      pickerDialogService,
      timeofftypeService,
      errorService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

  addNew() {
    super.addNew(TimeofftypeNewExtendedComponent);
  }
}
