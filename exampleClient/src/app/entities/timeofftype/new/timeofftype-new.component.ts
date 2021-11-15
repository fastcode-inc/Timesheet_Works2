import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TimeofftypeService } from '../timeofftype.service';
import { ITimeofftype } from '../itimeofftype';
import { BaseNewComponent, FieldType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

@Component({
  selector: 'app-timeofftype-new',
  templateUrl: './timeofftype-new.component.html',
  styleUrls: ['./timeofftype-new.component.scss'],
})
export class TimeofftypeNewComponent extends BaseNewComponent<ITimeofftype> implements OnInit {
  title: string = 'New Timeofftype';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TimeofftypeNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public timeofftypeService: TimeofftypeService,
    public errorService: ErrorService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(formBuilder, router, route, dialog, dialogRef, data, pickerDialogService, timeofftypeService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Timeofftype';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.checkPassedData();
  }

  setForm() {
    this.itemForm = this.formBuilder.group({
      typename: ['', Validators.required],
    });

    this.fields = [
      {
        name: 'typename',
        label: 'typename',
        isRequired: true,
        isAutoGenerated: false,
        type: FieldType.String,
      },
    ];
  }

  setAssociations() {
    this.associations = [];
    this.parentAssociations = this.associations.filter((association) => {
      return !association.isParent;
    });
  }

  onSubmit() {
    let timeofftype = this.itemForm.getRawValue();

    super.onSubmit(timeofftype);
  }
}
