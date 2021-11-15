import { NgModule } from '@angular/core';

import { TimesheetstatusDetailsComponent, TimesheetstatusListComponent, TimesheetstatusNewComponent } from './';
import { timesheetstatusRoute } from './timesheetstatus.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [TimesheetstatusDetailsComponent, TimesheetstatusListComponent, TimesheetstatusNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [timesheetstatusRoute, SharedModule, GeneralComponentsModule],
})
export class TimesheetstatusModule {}
