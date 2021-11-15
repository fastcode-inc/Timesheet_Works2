import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  UsersroleExtendedService,
  UsersroleDetailsExtendedComponent,
  UsersroleListExtendedComponent,
  UsersroleNewExtendedComponent,
} from '../';
import { IUsersrole } from 'src/app/admin/user-management/usersrole';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('UsersroleListExtendedComponent', () => {
  let fixture: ComponentFixture<UsersroleListExtendedComponent>;
  let component: UsersroleListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [UsersroleListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [UsersroleExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsersroleListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          UsersroleListExtendedComponent,
          UsersroleNewExtendedComponent,
          NewComponent,
          UsersroleDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'usersrole', component: UsersroleListExtendedComponent },
            { path: 'usersrole/:id', component: UsersroleDetailsExtendedComponent },
          ]),
        ],
        providers: [UsersroleExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsersroleListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
