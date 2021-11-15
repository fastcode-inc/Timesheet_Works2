import { NgModule } from '@angular/core';

import { ProjectDetailsComponent, ProjectListComponent, ProjectNewComponent } from './';
import { projectRoute } from './project.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [ProjectDetailsComponent, ProjectListComponent, ProjectNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [projectRoute, SharedModule, GeneralComponentsModule],
})
export class ProjectModule {}
