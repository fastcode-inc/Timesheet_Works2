import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UsersroleService } from '../usersrole.service';
import { IUsersrole } from '../iusersrole';
import { BaseNewComponent, FieldType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { RoleService } from 'src/app/admin/user-management/role/role.service';
import { UsersService } from 'src/app/admin/user-management/users/users.service';

@Component({
  selector: 'app-usersrole-new',
  templateUrl: './usersrole-new.component.html',
  styleUrls: ['./usersrole-new.component.scss'],
})
export class UsersroleNewComponent extends BaseNewComponent<IUsersrole> implements OnInit {
  title: string = 'New Usersrole';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UsersroleNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public usersroleService: UsersroleService,
    public errorService: ErrorService,
    public roleService: RoleService,
    public usersService: UsersService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(formBuilder, router, route, dialog, dialogRef, data, pickerDialogService, usersroleService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Usersrole';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.checkPassedData();
  }

  setForm() {
    this.itemForm = this.formBuilder.group({
      roleId: ['', Validators.required],
      usersId: ['', Validators.required],
      roleDescriptiveField: [''],
      usersDescriptiveField: [''],
    });

    this.fields = [];
  }

  setAssociations() {
    this.associations = [
      {
        column: [
          {
            key: 'roleId',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        table: 'role',
        type: 'ManyToOne',
        service: this.roleService,
        label: 'role',
        descriptiveField: 'roleDescriptiveField',
        referencedDescriptiveField: 'displayName',
      },
      {
        column: [
          {
            key: 'usersId',
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
    let usersrole = this.itemForm.getRawValue();

    super.onSubmit(usersrole);
  }
}
