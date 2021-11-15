import { NgModule } from '@angular/core';

import { TimesheetdetailsDetailsComponent, TimesheetdetailsListComponent, TimesheetdetailsNewComponent } from './';
import { timesheetdetailsRoute } from './timesheetdetails.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [TimesheetdetailsDetailsComponent, TimesheetdetailsListComponent, TimesheetdetailsNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [timesheetdetailsRoute, SharedModule, GeneralComponentsModule],
})
export class TimesheetdetailsModule {}
