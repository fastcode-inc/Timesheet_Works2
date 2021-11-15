import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  UsersExtendedService,
  UsersDetailsExtendedComponent,
  UsersListExtendedComponent,
  UsersNewExtendedComponent,
} from '../';
import { IUsers } from 'src/app/admin/user-management/users';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('UsersListExtendedComponent', () => {
  let fixture: ComponentFixture<UsersListExtendedComponent>;
  let component: UsersListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [UsersListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [UsersExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsersListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          UsersListExtendedComponent,
          UsersNewExtendedComponent,
          NewComponent,
          UsersDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'users', component: UsersListExtendedComponent },
            { path: 'users/:id', component: UsersDetailsExtendedComponent },
          ]),
        ],
        providers: [UsersExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsersListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
