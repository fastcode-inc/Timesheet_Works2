import { NgModule } from '@angular/core';

import { TaskDetailsComponent, TaskListComponent, TaskNewComponent } from './';
import { taskRoute } from './task.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [TaskDetailsComponent, TaskListComponent, TaskNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [taskRoute, SharedModule, GeneralComponentsModule],
})
export class TaskModule {}
