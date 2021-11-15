import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  TimesheetExtendedService,
  TimesheetDetailsExtendedComponent,
  TimesheetListExtendedComponent,
  TimesheetNewExtendedComponent,
} from '../';
import { ITimesheet } from 'src/app/entities/timesheet';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('TimesheetListExtendedComponent', () => {
  let fixture: ComponentFixture<TimesheetListExtendedComponent>;
  let component: TimesheetListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TimesheetListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [TimesheetExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          TimesheetListExtendedComponent,
          TimesheetNewExtendedComponent,
          NewComponent,
          TimesheetDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'timesheet', component: TimesheetListExtendedComponent },
            { path: 'timesheet/:id', component: TimesheetDetailsExtendedComponent },
          ]),
        ],
        providers: [TimesheetExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
