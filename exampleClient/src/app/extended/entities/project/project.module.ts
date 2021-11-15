import { NgModule } from '@angular/core';

import {
  ProjectExtendedService,
  ProjectDetailsExtendedComponent,
  ProjectListExtendedComponent,
  ProjectNewExtendedComponent,
} from './';
import { ProjectService } from 'src/app/entities/project';
import { ProjectModule } from 'src/app/entities/project/project.module';
import { projectRoute } from './project.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsExtendedModule } from 'src/app/extended/common/general-components/general-extended.module';

const entities = [ProjectDetailsExtendedComponent, ProjectListExtendedComponent, ProjectNewExtendedComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [projectRoute, ProjectModule, SharedModule, GeneralComponentsExtendedModule],
  providers: [{ provide: ProjectService, useClass: ProjectExtendedService }],
})
export class ProjectExtendedModule {}
