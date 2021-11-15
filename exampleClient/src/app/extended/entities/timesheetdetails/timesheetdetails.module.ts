import { NgModule } from '@angular/core';

import {
  TimesheetdetailsExtendedService,
  TimesheetdetailsDetailsExtendedComponent,
  TimesheetdetailsListExtendedComponent,
  TimesheetdetailsNewExtendedComponent,
} from './';
import { TimesheetdetailsService } from 'src/app/entities/timesheetdetails';
import { TimesheetdetailsModule } from 'src/app/entities/timesheetdetails/timesheetdetails.module';
import { timesheetdetailsRoute } from './timesheetdetails.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsExtendedModule } from 'src/app/extended/common/general-components/general-extended.module';

const entities = [
  TimesheetdetailsDetailsExtendedComponent,
  TimesheetdetailsListExtendedComponent,
  TimesheetdetailsNewExtendedComponent,
];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [timesheetdetailsRoute, TimesheetdetailsModule, SharedModule, GeneralComponentsExtendedModule],
  providers: [{ provide: TimesheetdetailsService, useClass: TimesheetdetailsExtendedService }],
})
export class TimesheetdetailsExtendedModule {}
