import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import {
  TimesheetstatusExtendedService,
  TimesheetstatusDetailsExtendedComponent,
  TimesheetstatusListExtendedComponent,
} from '../';
import { ITimesheetstatus } from 'src/app/entities/timesheetstatus';
describe('TimesheetstatusDetailsExtendedComponent', () => {
  let component: TimesheetstatusDetailsExtendedComponent;
  let fixture: ComponentFixture<TimesheetstatusDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TimesheetstatusDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [TimesheetstatusExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetstatusDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          TimesheetstatusDetailsExtendedComponent,
          TimesheetstatusListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'timesheetstatus', component: TimesheetstatusDetailsExtendedComponent },
            { path: 'timesheetstatus/:id', component: TimesheetstatusListExtendedComponent },
          ]),
        ],
        providers: [TimesheetstatusExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetstatusDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
