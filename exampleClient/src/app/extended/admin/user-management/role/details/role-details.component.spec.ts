import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import { RoleExtendedService, RoleDetailsExtendedComponent, RoleListExtendedComponent } from '../';
import { IRole } from 'src/app/admin/user-management/role';
describe('RoleDetailsExtendedComponent', () => {
  let component: RoleDetailsExtendedComponent;
  let fixture: ComponentFixture<RoleDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [RoleDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [RoleExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RoleDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          RoleDetailsExtendedComponent,
          RoleListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'role', component: RoleDetailsExtendedComponent },
            { path: 'role/:id', component: RoleListExtendedComponent },
          ]),
        ],
        providers: [RoleExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RoleDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
