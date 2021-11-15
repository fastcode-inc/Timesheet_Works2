import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { UsertaskService } from '../usertask.service';
import { IUsertask } from '../iusertask';
import { BaseDetailsComponent, FieldType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { TaskService } from 'src/app/entities/task/task.service';
import { UsersService } from 'src/app/admin/user-management/users/users.service';

@Component({
  selector: 'app-usertask-details',
  templateUrl: './usertask-details.component.html',
  styleUrls: ['./usertask-details.component.scss'],
})
export class UsertaskDetailsComponent extends BaseDetailsComponent<IUsertask> implements OnInit {
  title = 'Usertask';
  parentUrl = 'usertask';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public usertaskService: UsertaskService,
    public pickerDialogService: PickerDialogService,
    public errorService: ErrorService,
    public taskService: TaskService,
    public usersService: UsersService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(formBuilder, router, route, dialog, pickerDialogService, usertaskService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Usertask';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.getItem();
  }

  setForm() {
    this.itemForm = this.formBuilder.group({
      taskid: ['', Validators.required],
      userid: ['', Validators.required],
      taskDescriptiveField: [''],
      usersDescriptiveField: [''],
    });

    this.fields = [];
  }

  onItemFetched(item: IUsertask) {
    this.item = item;
    this.itemForm.patchValue(item);
  }

  setAssociations() {
    this.associations = [
      {
        column: [
          {
            key: 'taskid',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        table: 'task',
        type: 'ManyToOne',
        label: 'task',
        service: this.taskService,
        descriptiveField: 'taskDescriptiveField',
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
    let usertask = this.itemForm.getRawValue();

    super.onSubmit(usertask);
  }
}
