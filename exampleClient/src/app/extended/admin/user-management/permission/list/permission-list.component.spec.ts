import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  PermissionExtendedService,
  PermissionDetailsExtendedComponent,
  PermissionListExtendedComponent,
  PermissionNewExtendedComponent,
} from '../';
import { IPermission } from 'src/app/admin/user-management/permission';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('PermissionListExtendedComponent', () => {
  let fixture: ComponentFixture<PermissionListExtendedComponent>;
  let component: PermissionListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [PermissionListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [PermissionExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PermissionListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          PermissionListExtendedComponent,
          PermissionNewExtendedComponent,
          NewComponent,
          PermissionDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'permission', component: PermissionListExtendedComponent },
            { path: 'permission/:id', component: PermissionDetailsExtendedComponent },
          ]),
        ],
        providers: [PermissionExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PermissionListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
