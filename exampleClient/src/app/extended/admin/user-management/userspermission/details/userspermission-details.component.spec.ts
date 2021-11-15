import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import {
  UserspermissionExtendedService,
  UserspermissionDetailsExtendedComponent,
  UserspermissionListExtendedComponent,
} from '../';
import { IUserspermission } from 'src/app/admin/user-management/userspermission';
describe('UserspermissionDetailsExtendedComponent', () => {
  let component: UserspermissionDetailsExtendedComponent;
  let fixture: ComponentFixture<UserspermissionDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [UserspermissionDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [UserspermissionExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserspermissionDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          UserspermissionDetailsExtendedComponent,
          UserspermissionListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'userspermission', component: UserspermissionDetailsExtendedComponent },
            { path: 'userspermission/:id', component: UserspermissionListExtendedComponent },
          ]),
        ],
        providers: [UserspermissionExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserspermissionDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
