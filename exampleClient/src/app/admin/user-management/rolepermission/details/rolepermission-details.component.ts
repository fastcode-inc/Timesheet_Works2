import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { RolepermissionService } from '../rolepermission.service';
import { IRolepermission } from '../irolepermission';
import { BaseDetailsComponent, FieldType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { PermissionService } from 'src/app/admin/user-management/permission/permission.service';
import { RoleService } from 'src/app/admin/user-management/role/role.service';

@Component({
  selector: 'app-rolepermission-details',
  templateUrl: './rolepermission-details.component.html',
  styleUrls: ['./rolepermission-details.component.scss'],
})
export class RolepermissionDetailsComponent extends BaseDetailsComponent<IRolepermission> implements OnInit {
  title = 'Rolepermission';
  parentUrl = 'rolepermission';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public rolepermissionService: RolepermissionService,
    public pickerDialogService: PickerDialogService,
    public errorService: ErrorService,
    public permissionService: PermissionService,
    public roleService: RoleService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(formBuilder, router, route, dialog, pickerDialogService, rolepermissionService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Rolepermission';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.getItem();
  }

  setForm() {
    this.itemForm = this.formBuilder.group({
      permissionId: ['', Validators.required],
      roleId: ['', Validators.required],
      permissionDescriptiveField: [''],
      roleDescriptiveField: [''],
    });

    this.fields = [];
  }

  onItemFetched(item: IRolepermission) {
    this.item = item;
    this.itemForm.patchValue(item);
  }

  setAssociations() {
    this.associations = [
      {
        column: [
          {
            key: 'permissionId',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: false,
        table: 'permission',
        type: 'ManyToOne',
        label: 'permission',
        service: this.permissionService,
        descriptiveField: 'permissionDescriptiveField',
        referencedDescriptiveField: 'displayName',
      },
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
    ];

    this.childAssociations = this.associations.filter((association) => {
      return association.isParent;
    });

    this.parentAssociations = this.associations.filter((association) => {
      return !association.isParent;
    });
  }

  onSubmit() {
    let rolepermission = this.itemForm.getRawValue();

    super.onSubmit(rolepermission);
  }
}
