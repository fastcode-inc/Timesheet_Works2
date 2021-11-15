import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  ProjectExtendedService,
  ProjectDetailsExtendedComponent,
  ProjectListExtendedComponent,
  ProjectNewExtendedComponent,
} from '../';
import { IProject } from 'src/app/entities/project';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('ProjectListExtendedComponent', () => {
  let fixture: ComponentFixture<ProjectListExtendedComponent>;
  let component: ProjectListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ProjectListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [ProjectExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ProjectListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ProjectListExtendedComponent,
          ProjectNewExtendedComponent,
          NewComponent,
          ProjectDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'project', component: ProjectListExtendedComponent },
            { path: 'project/:id', component: ProjectDetailsExtendedComponent },
          ]),
        ],
        providers: [ProjectExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ProjectListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
