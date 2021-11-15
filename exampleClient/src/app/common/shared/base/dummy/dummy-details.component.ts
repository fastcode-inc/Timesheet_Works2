import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { PickerDialogService, BaseDetailsComponent } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { IDummy } from './idummy';
import { DummyService, ParentService } from './dummy.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

@Component({
  selector: 'app-dummy-details',
  template: '',
})
export class DummyDetailsComponent extends BaseDetailsComponent<IDummy> implements OnInit {
  title: string = 'Dummy';
  parentUrl: string = 'dummy';

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dataService: DummyService,
    public parentService: ParentService,
    public globalPermissionService: GlobalPermissionService,
    public pickerDialogService: PickerDialogService,
    public errorService: ErrorService
  ) {
    super(formBuilder, router, route, dialog, pickerDialogService, dataService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Dummy';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.getItem();
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
            key: 'dummyId',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: true,
        table: 'child',
        type: 'OneToMany',
        descriptiveField: 'childDescriptiveField',
        referencedDescriptiveField: 'name',
      },
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
        service: this.parentService,
        descriptiveField: 'parentDescriptiveField',
        referencedDescriptiveField: 'name',
        data: [],
      },
      {
        column: [
          {
            key: 'dummyId',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: true,
        table: 'oneChild',
        type: 'OneToOne',
        associatedPrimaryKeys: ['id'],
        data: [],
      },
    ];
    this.childAssociations = this.associations.filter((association) => {
      return association.isParent;
    });

    this.parentAssociations = this.associations.filter((association) => {
      return !association.isParent;
    });
  }
}
