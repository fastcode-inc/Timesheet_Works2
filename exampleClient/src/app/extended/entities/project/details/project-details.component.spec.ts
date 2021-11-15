import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import { ProjectExtendedService, ProjectDetailsExtendedComponent, ProjectListExtendedComponent } from '../';
import { IProject } from 'src/app/entities/project';
describe('ProjectDetailsExtendedComponent', () => {
  let component: ProjectDetailsExtendedComponent;
  let fixture: ComponentFixture<ProjectDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ProjectDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [ProjectExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ProjectDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ProjectDetailsExtendedComponent,
          ProjectListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'project', component: ProjectDetailsExtendedComponent },
            { path: 'project/:id', component: ProjectListExtendedComponent },
          ]),
        ],
        providers: [ProjectExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ProjectDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
