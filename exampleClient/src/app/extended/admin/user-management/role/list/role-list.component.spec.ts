import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  RoleExtendedService,
  RoleDetailsExtendedComponent,
  RoleListExtendedComponent,
  RoleNewExtendedComponent,
} from '../';
import { IRole } from 'src/app/admin/user-management/role';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('RoleListExtendedComponent', () => {
  let fixture: ComponentFixture<RoleListExtendedComponent>;
  let component: RoleListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [RoleListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [RoleExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RoleListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          RoleListExtendedComponent,
          RoleNewExtendedComponent,
          NewComponent,
          RoleDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'role', component: RoleListExtendedComponent },
            { path: 'role/:id', component: RoleDetailsExtendedComponent },
          ]),
        ],
        providers: [RoleExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RoleListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
