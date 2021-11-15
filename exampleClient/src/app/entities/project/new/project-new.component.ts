import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProjectService } from '../project.service';
import { IProject } from '../iproject';
import { BaseNewComponent, FieldType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { CustomerService } from 'src/app/entities/customer/customer.service';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss'],
})
export class ProjectNewComponent extends BaseNewComponent<IProject> implements OnInit {
  title: string = 'New Project';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public projectService: ProjectService,
    public errorService: ErrorService,
    public customerService: CustomerService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(formBuilder, router, route, dialog, dialogRef, data, pickerDialogService, projectService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Project';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.checkPassedData();
  }

  setForm() {
    this.itemForm = this.formBuilder.group({
      description: [''],
      enddate: ['', Validators.required],
      name: ['', Validators.required],
      startdate: ['', Validators.required],
      customerid: ['', Validators.required],
      customerDescriptiveField: ['', Validators.required],
    });

    this.fields = [
      {
        name: 'startdate',
        label: 'startdate',
        isRequired: true,
        isAutoGenerated: false,
        type: FieldType.Date,
      },
      {
        name: 'name',
        label: 'name',
        isRequired: true,
        isAutoGenerated: false,
        type: FieldType.String,
      },
      {
        name: 'enddate',
        label: 'enddate',
        isRequired: true,
        isAutoGenerated: false,
        type: FieldType.Date,
      },
      {
        name: 'description',
        label: 'description',
        isRequired: false,
        isAutoGenerated: false,
        type: FieldType.String,
      },
    ];
  }

  setAssociations() {
    this.associations = [
      {
        column: [
          {
            key: 'customerid',
            value: undefined,
            referencedkey: 'customerid',
          },
        ],
        isParent: false,
        table: 'customer',
        type: 'ManyToOne',
        service: this.customerService,
        label: 'customer',
        descriptiveField: 'customerDescriptiveField',
        referencedDescriptiveField: 'customerid',
      },
    ];
    this.parentAssociations = this.associations.filter((association) => {
      return !association.isParent;
    });
  }

  onSubmit() {
    let project = this.itemForm.getRawValue();

    super.onSubmit(project);
  }
}
