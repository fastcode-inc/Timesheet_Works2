import { Component, OnInit, Inject } from '@angular/core';
import { DummyService, ParentService } from './dummy.service';
import { IDummy } from './idummy';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BaseNewComponent, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

@Component({
  selector: 'app-dummy-new',
  template: '',
})
export class DummyNewComponent extends BaseNewComponent<IDummy> implements OnInit {
  title: string = 'New Dummy';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DummyNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public dataService: DummyService,
    public parentService: ParentService,
    public globalPermissionService: GlobalPermissionService,
    public errorService: ErrorService
  ) {
    super(formBuilder, router, route, dialog, dialogRef, data, pickerDialogService, dataService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Dummy';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.checkPassedData();
  }

  setForm() {
    this.itemForm = this.formBuilder.group({
      id: [''],
      name: [''],
      parentId: [''],
      parentDescriptiveField: [''],
    });
  }

  setAssociations() {
    this.associations = [
      {
        column: [
          {
            key: 'parentId',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        table: 'parent',
        type: 'ManyToOne',
        descriptiveField: 'parentDescriptiveField',
        referencedDescriptiveField: 'name',
        service: this.parentService,
      },
    ];
    this.parentAssociations = this.associations.filter((association) => {
      return !association.isParent;
    });
  }
}
