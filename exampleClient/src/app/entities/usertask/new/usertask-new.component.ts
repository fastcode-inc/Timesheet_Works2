import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UsertaskService } from '../usertask.service';
import { IUsertask } from '../iusertask';
import { BaseNewComponent, FieldType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { TaskService } from 'src/app/entities/task/task.service';
import { UsersService } from 'src/app/admin/user-management/users/users.service';

@Component({
  selector: 'app-usertask-new',
  templateUrl: './usertask-new.component.html',
  styleUrls: ['./usertask-new.component.scss'],
})
export class UsertaskNewComponent extends BaseNewComponent<IUsertask> implements OnInit {
  title: string = 'New Usertask';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UsertaskNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public usertaskService: UsertaskService,
    public errorService: ErrorService,
    public taskService: TaskService,
    public usersService: UsersService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(formBuilder, router, route, dialog, dialogRef, data, pickerDialogService, usertaskService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Usertask';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.checkPassedData();
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
        service: this.taskService,
        label: 'task',
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
        service: this.usersService,
        label: 'users',
        descriptiveField: 'usersDescriptiveField',
        referencedDescriptiveField: 'id',
      },
    ];
    this.parentAssociations = this.associations.filter((association) => {
      return !association.isParent;
    });
  }

  onSubmit() {
    let usertask = this.itemForm.getRawValue();

    super.onSubmit(usertask);
  }
}
