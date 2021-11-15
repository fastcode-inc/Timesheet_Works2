import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import { TimeofftypeExtendedService, TimeofftypeDetailsExtendedComponent, TimeofftypeListExtendedComponent } from '../';
import { ITimeofftype } from 'src/app/entities/timeofftype';
describe('TimeofftypeDetailsExtendedComponent', () => {
  let component: TimeofftypeDetailsExtendedComponent;
  let fixture: ComponentFixture<TimeofftypeDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TimeofftypeDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [TimeofftypeExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimeofftypeDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          TimeofftypeDetailsExtendedComponent,
          TimeofftypeListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'timeofftype', component: TimeofftypeDetailsExtendedComponent },
            { path: 'timeofftype/:id', component: TimeofftypeListExtendedComponent },
          ]),
        ],
        providers: [TimeofftypeExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimeofftypeDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
