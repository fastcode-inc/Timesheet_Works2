import { NgModule } from '@angular/core';

import { TimesheetDetailsComponent, TimesheetListComponent, TimesheetNewComponent } from './';
import { timesheetRoute } from './timesheet.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [TimesheetDetailsComponent, TimesheetListComponent, TimesheetNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [timesheetRoute, SharedModule, GeneralComponentsModule],
})
export class TimesheetModule {}
