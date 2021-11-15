import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TimeofftypeExtendedService } from '../timeofftype.service';

import { PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';

import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { TimeofftypeDetailsComponent } from 'src/app/entities/timeofftype/index';

@Component({
  selector: 'app-timeofftype-details',
  templateUrl: './timeofftype-details.component.html',
  styleUrls: ['./timeofftype-details.component.scss'],
})
export class TimeofftypeDetailsExtendedComponent extends TimeofftypeDetailsComponent implements OnInit {
  title: string = 'Timeofftype';
  parentUrl: string = 'timeofftype';
  //roles: IRole[];
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public timeofftypeExtendedService: TimeofftypeExtendedService,
    public pickerDialogService: PickerDialogService,
    public errorService: ErrorService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      formBuilder,
      router,
      route,
      dialog,
      timeofftypeExtendedService,
      pickerDialogService,
      errorService,
      globalPermissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
