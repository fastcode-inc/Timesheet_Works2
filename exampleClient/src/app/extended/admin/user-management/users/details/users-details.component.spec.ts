import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import { UsersExtendedService, UsersDetailsExtendedComponent, UsersListExtendedComponent } from '../';
import { IUsers } from 'src/app/admin/user-management/users';
describe('UsersDetailsExtendedComponent', () => {
  let component: UsersDetailsExtendedComponent;
  let fixture: ComponentFixture<UsersDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [UsersDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [UsersExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsersDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          UsersDetailsExtendedComponent,
          UsersListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'users', component: UsersDetailsExtendedComponent },
            { path: 'users/:id', component: UsersListExtendedComponent },
          ]),
        ],
        providers: [UsersExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsersDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
