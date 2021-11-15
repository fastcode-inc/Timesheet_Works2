import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import { TaskExtendedService, TaskDetailsExtendedComponent, TaskListExtendedComponent } from '../';
import { ITask } from 'src/app/entities/task';
describe('TaskDetailsExtendedComponent', () => {
  let component: TaskDetailsExtendedComponent;
  let fixture: ComponentFixture<TaskDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TaskDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [TaskExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TaskDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          TaskDetailsExtendedComponent,
          TaskListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'task', component: TaskDetailsExtendedComponent },
            { path: 'task/:id', component: TaskListExtendedComponent },
          ]),
        ],
        providers: [TaskExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TaskDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
