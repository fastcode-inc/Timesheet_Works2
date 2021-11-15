import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import { UsersroleExtendedService, UsersroleDetailsExtendedComponent, UsersroleListExtendedComponent } from '../';
import { IUsersrole } from 'src/app/admin/user-management/usersrole';
describe('UsersroleDetailsExtendedComponent', () => {
  let component: UsersroleDetailsExtendedComponent;
  let fixture: ComponentFixture<UsersroleDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [UsersroleDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [UsersroleExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsersroleDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          UsersroleDetailsExtendedComponent,
          UsersroleListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'usersrole', component: UsersroleDetailsExtendedComponent },
            { path: 'usersrole/:id', component: UsersroleListExtendedComponent },
          ]),
        ],
        providers: [UsersroleExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsersroleDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
