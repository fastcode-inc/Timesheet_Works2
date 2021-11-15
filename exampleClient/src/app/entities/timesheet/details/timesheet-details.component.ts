import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TimesheetService } from '../timesheet.service';
import { ITimesheet } from '../itimesheet';
import { BaseDetailsComponent, FieldType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { TimesheetstatusService } from 'src/app/entities/timesheetstatus/timesheetstatus.service';
import { UsersService } from 'src/app/admin/user-management/users/users.service';

@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.scss'],
})
export class TimesheetDetailsComponent extends BaseDetailsComponent<ITimesheet> implements OnInit {
  title = 'Timesheet';
  parentUrl = 'timesheet';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public timesheetService: TimesheetService,
    public pickerDialogService: PickerDialogService,
    public errorService: ErrorService,
    public timesheetstatusService: TimesheetstatusService,
    public usersService: UsersService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(formBuilder, router, route, dialog, pickerDialogService, timesheetService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Timesheet';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.getItem();
  }

  setForm() {
    this.itemForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      notes: [''],
      periodendingdate: ['', Validators.required],
      periodstartingdate: ['', Validators.required],
      timesheetstatusid: ['', Validators.required],
      timesheetstatusDescriptiveField: ['', Validators.required],
      userid: ['', Validators.required],
      usersDescriptiveField: ['', Validators.required],
    });

    this.fields = [
      {
        name: 'periodstartingdate',
        label: 'periodstartingdate',
        isRequired: true,
        isAutoGenerated: false,
        type: FieldType.Date,
      },
      {
        name: 'periodendingdate',
        label: 'periodendingdate',
        isRequired: true,
        isAutoGenerated: false,
        type: FieldType.Date,
      },
      {
        name: 'notes',
        label: 'notes',
        isRequired: false,
        isAutoGenerated: false,
        type: FieldType.String,
      },
    ];
  }

  onItemFetched(item: ITimesheet) {
    this.item = item;
    this.itemForm.get('periodendingdate')?.setValue(item.periodendingdate ? new Date(item.periodendingdate) : null);
    this.itemForm
      .get('periodstartingdate')
      ?.setValue(item.periodstartingdate ? new Date(item.periodstartingdate) : null);
    this.itemForm.patchValue(item);
  }

  setAssociations() {
    this.associations = [
      {
        column: [
          {
            key: 'timesheetid',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: true,
        table: 'timesheetdetails',
        type: 'OneToMany',
        label: 'timesheetdetails',
      },
      {
        column: [
          {
            key: 'timesheetstatusid',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        table: 'timesheetstatus',
        type: 'ManyToOne',
        label: 'timesheetstatus',
        service: this.timesheetstatusService,
        descriptiveField: 'timesheetstatusDescriptiveField',
        referencedDescriptiveField: 'id',
      },
      {
        column: [
          {
            key: 'userid',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        table: 'users',
        type: 'ManyToOne',
        label: 'users',
        service: this.usersService,
        descriptiveField: 'usersDescriptiveField',
        referencedDescriptiveField: 'id',
      },
    ];

    this.childAssociations = this.associations.filter((association) => {
      return association.isParent;
    });

    this.parentAssociations = this.associations.filter((association) => {
      return !association.isParent;
    });
  }

  onSubmit() {
    let timesheet = this.itemForm.getRawValue();

    super.onSubmit(timesheet);
  }
}
