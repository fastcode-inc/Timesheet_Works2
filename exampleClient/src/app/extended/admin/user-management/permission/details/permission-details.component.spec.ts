import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import { PermissionExtendedService, PermissionDetailsExtendedComponent, PermissionListExtendedComponent } from '../';
import { IPermission } from 'src/app/admin/user-management/permission';
describe('PermissionDetailsExtendedComponent', () => {
  let component: PermissionDetailsExtendedComponent;
  let fixture: ComponentFixture<PermissionDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [PermissionDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [PermissionExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PermissionDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          PermissionDetailsExtendedComponent,
          PermissionListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'permission', component: PermissionDetailsExtendedComponent },
            { path: 'permission/:id', component: PermissionListExtendedComponent },
          ]),
        ],
        providers: [PermissionExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PermissionDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
