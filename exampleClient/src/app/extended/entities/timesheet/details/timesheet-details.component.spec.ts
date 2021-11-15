import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import { TimesheetExtendedService, TimesheetDetailsExtendedComponent, TimesheetListExtendedComponent } from '../';
import { ITimesheet } from 'src/app/entities/timesheet';
describe('TimesheetDetailsExtendedComponent', () => {
  let component: TimesheetDetailsExtendedComponent;
  let fixture: ComponentFixture<TimesheetDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TimesheetDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [TimesheetExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          TimesheetDetailsExtendedComponent,
          TimesheetListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'timesheet', component: TimesheetDetailsExtendedComponent },
            { path: 'timesheet/:id', component: TimesheetListExtendedComponent },
          ]),
        ],
        providers: [TimesheetExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
