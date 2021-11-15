import { NgModule } from '@angular/core';

import { TimeofftypeDetailsComponent, TimeofftypeListComponent, TimeofftypeNewComponent } from './';
import { timeofftypeRoute } from './timeofftype.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [TimeofftypeDetailsComponent, TimeofftypeListComponent, TimeofftypeNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [timeofftypeRoute, SharedModule, GeneralComponentsModule],
})
export class TimeofftypeModule {}
