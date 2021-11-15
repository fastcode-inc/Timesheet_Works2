import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IUsertask } from '../iusertask';
import { UsertaskService } from '../usertask.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsertaskNewComponent } from '../new/usertask-new.component';
import { BaseListComponent, ListColumnType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { TaskService } from 'src/app/entities/task/task.service';
import { UsersService } from 'src/app/admin/user-management/users/users.service';

@Component({
  selector: 'app-usertask-list',
  templateUrl: './usertask-list.component.html',
  styleUrls: ['./usertask-list.component.scss'],
})
export class UsertaskListComponent extends BaseListComponent<IUsertask> implements OnInit {
  title = 'Usertask';
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public usertaskService: UsertaskService,
    public errorService: ErrorService,
    public taskService: TaskService,
    public usersService: UsersService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(router, route, dialog, global, changeDetectorRefs, pickerDialogService, usertaskService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Usertask';
    this.setAssociation();
    this.setColumns();
    this.primaryKeys = ['taskid', 'userid'];
    super.ngOnInit();
  }

  setAssociation() {
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
        descriptiveField: 'taskDescriptiveField',
        referencedDescriptiveField: 'id',
        service: this.taskService,
        associatedObj: undefined,
        table: 'task',
        type: 'ManyToOne',
        url: 'usertasks',
        listColumn: 'task',
        label: 'task',
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
        descriptiveField: 'usersDescriptiveField',
        referencedDescriptiveField: 'id',
        service: this.usersService,
        associatedObj: undefined,
        table: 'users',
        type: 'ManyToOne',
        url: 'usertasks',
        listColumn: 'users',
        label: 'users',
      },
    ];
  }

  setColumns() {
    this.columns = [
      {
        column: 'taskDescriptiveField',
        searchColumn: 'task',
        label: 'task',
        sort: true,
        filter: true,
        type: ListColumnType.String,
      },
      {
        column: 'usersDescriptiveField',
        searchColumn: 'users',
        label: 'users',
        sort: true,
        filter: true,
        type: ListColumnType.String,
      },
      {
        column: 'actions',
        label: 'Actions',
        sort: false,
        filter: false,
        type: ListColumnType.String,
      },
    ];
    this.selectedColumns = this.columns;
    this.displayedColumns = this.columns.map((obj) => {
      return obj.column;
    });
  }
  addNew(comp: any) {
    if (!comp) {
      comp = UsertaskNewComponent;
    }
    super.addNew(comp);
  }
}
