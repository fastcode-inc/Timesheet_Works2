import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import { TimesheetstatusExtendedService, TimesheetstatusNewExtendedComponent } from '../';
import { ITimesheetstatus } from 'src/app/entities/timesheetstatus';
import { NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('TimesheetstatusNewExtendedComponent', () => {
  let component: TimesheetstatusNewExtendedComponent;
  let fixture: ComponentFixture<TimesheetstatusNewExtendedComponent>;

  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TimesheetstatusNewExtendedComponent, NewComponent, FieldsComp],
        imports: [TestingModule],
        providers: [TimesheetstatusExtendedService, { provide: MAT_DIALOG_DATA, useValue: {} }],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetstatusNewExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    describe('', () => {
      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [TimesheetstatusNewExtendedComponent, NewComponent, FieldsComp].concat(EntryComponents),
          imports: [TestingModule],
          providers: [TimesheetstatusExtendedService, { provide: MAT_DIALOG_DATA, useValue: {} }],
        });
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(TimesheetstatusNewExtendedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    });
  });
});
