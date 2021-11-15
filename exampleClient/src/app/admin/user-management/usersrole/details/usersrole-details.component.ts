import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { UsersroleService } from '../usersrole.service';
import { IUsersrole } from '../iusersrole';
import { BaseDetailsComponent, FieldType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { RoleService } from 'src/app/admin/user-management/role/role.service';
import { UsersService } from 'src/app/admin/user-management/users/users.service';

@Component({
  selector: 'app-usersrole-details',
  templateUrl: './usersrole-details.component.html',
  styleUrls: ['./usersrole-details.component.scss'],
})
export class UsersroleDetailsComponent extends BaseDetailsComponent<IUsersrole> implements OnInit {
  title = 'Usersrole';
  parentUrl = 'usersrole';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public usersroleService: UsersroleService,
    public pickerDialogService: PickerDialogService,
    public errorService: ErrorService,
    public roleService: RoleService,
    public usersService: UsersService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(formBuilder, router, route, dialog, pickerDialogService, usersroleService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Usersrole';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.getItem();
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

  onItemFetched(item: IUsersrole) {
    this.item = item;
    this.itemForm.patchValue(item);
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
        label: 'role',
        service: this.roleService,
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
    let usersrole = this.itemForm.getRawValue();

    super.onSubmit(usersrole);
  }
}
