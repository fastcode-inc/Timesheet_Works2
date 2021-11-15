import { NgModule } from '@angular/core';

import {
  TaskExtendedService,
  TaskDetailsExtendedComponent,
  TaskListExtendedComponent,
  TaskNewExtendedComponent,
} from './';
import { TaskService } from 'src/app/entities/task';
import { TaskModule } from 'src/app/entities/task/task.module';
import { taskRoute } from './task.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsExtendedModule } from 'src/app/extended/common/general-components/general-extended.module';

const entities = [TaskDetailsExtendedComponent, TaskListExtendedComponent, TaskNewExtendedComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [taskRoute, TaskModule, SharedModule, GeneralComponentsExtendedModule],
  providers: [{ provide: TaskService, useClass: TaskExtendedService }],
})
export class TaskExtendedModule {}
