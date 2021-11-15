import { NgModule } from '@angular/core';

import {
  TimesheetstatusExtendedService,
  TimesheetstatusDetailsExtendedComponent,
  TimesheetstatusListExtendedComponent,
  TimesheetstatusNewExtendedComponent,
} from './';
import { TimesheetstatusService } from 'src/app/entities/timesheetstatus';
import { TimesheetstatusModule } from 'src/app/entities/timesheetstatus/timesheetstatus.module';
import { timesheetstatusRoute } from './timesheetstatus.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsExtendedModule } from 'src/app/extended/common/general-components/general-extended.module';

const entities = [
  TimesheetstatusDetailsExtendedComponent,
  TimesheetstatusListExtendedComponent,
  TimesheetstatusNewExtendedComponent,
];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [timesheetstatusRoute, TimesheetstatusModule, SharedModule, GeneralComponentsExtendedModule],
  providers: [{ provide: TimesheetstatusService, useClass: TimesheetstatusExtendedService }],
})
export class TimesheetstatusExtendedModule {}
