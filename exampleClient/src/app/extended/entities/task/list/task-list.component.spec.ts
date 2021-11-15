import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  TaskExtendedService,
  TaskDetailsExtendedComponent,
  TaskListExtendedComponent,
  TaskNewExtendedComponent,
} from '../';
import { ITask } from 'src/app/entities/task';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('TaskListExtendedComponent', () => {
  let fixture: ComponentFixture<TaskListExtendedComponent>;
  let component: TaskListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TaskListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [TaskExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TaskListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          TaskListExtendedComponent,
          TaskNewExtendedComponent,
          NewComponent,
          TaskDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'task', component: TaskListExtendedComponent },
            { path: 'task/:id', component: TaskDetailsExtendedComponent },
          ]),
        ],
        providers: [TaskExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TaskListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
