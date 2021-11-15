import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RolepermissionService } from '../rolepermission.service';
import { IRolepermission } from '../irolepermission';
import { BaseNewComponent, FieldType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { PermissionService } from 'src/app/admin/user-management/permission/permission.service';
import { RoleService } from 'src/app/admin/user-management/role/role.service';

@Component({
  selector: 'app-rolepermission-new',
  templateUrl: './rolepermission-new.component.html',
  styleUrls: ['./rolepermission-new.component.scss'],
})
export class RolepermissionNewComponent extends BaseNewComponent<IRolepermission> implements OnInit {
  title: string = 'New Rolepermission';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RolepermissionNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public rolepermissionService: RolepermissionService,
    public errorService: ErrorService,
    public permissionService: PermissionService,
    public roleService: RoleService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      formBuilder,
      router,
      route,
      dialog,
      dialogRef,
      data,
      pickerDialogService,
      rolepermissionService,
      errorService
    );
  }

  ngOnInit() {
    this.entityName = 'Rolepermission';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.checkPassedData();
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
        service: this.permissionService,
        label: 'permission',
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
        service: this.roleService,
        label: 'role',
        descriptiveField: 'roleDescriptiveField',
        referencedDescriptiveField: 'displayName',
      },
    ];
    this.parentAssociations = this.associations.filter((association) => {
      return !association.isParent;
    });
  }

  onSubmit() {
    let rolepermission = this.itemForm.getRawValue();

    super.onSubmit(rolepermission);
  }
}
