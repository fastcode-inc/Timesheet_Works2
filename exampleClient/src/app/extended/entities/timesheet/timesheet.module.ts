import { NgModule } from '@angular/core';

import {
  TimesheetExtendedService,
  TimesheetDetailsExtendedComponent,
  TimesheetListExtendedComponent,
  TimesheetNewExtendedComponent,
} from './';
import { TimesheetService } from 'src/app/entities/timesheet';
import { TimesheetModule } from 'src/app/entities/timesheet/timesheet.module';
import { timesheetRoute } from './timesheet.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsExtendedModule } from 'src/app/extended/common/general-components/general-extended.module';

const entities = [TimesheetDetailsExtendedComponent, TimesheetListExtendedComponent, TimesheetNewExtendedComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [timesheetRoute, TimesheetModule, SharedModule, GeneralComponentsExtendedModule],
  providers: [{ provide: TimesheetService, useClass: TimesheetExtendedService }],
})
export class TimesheetExtendedModule {}
