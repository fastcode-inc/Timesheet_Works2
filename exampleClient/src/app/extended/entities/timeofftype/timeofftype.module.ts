import { NgModule } from '@angular/core';

import {
  TimeofftypeExtendedService,
  TimeofftypeDetailsExtendedComponent,
  TimeofftypeListExtendedComponent,
  TimeofftypeNewExtendedComponent,
} from './';
import { TimeofftypeService } from 'src/app/entities/timeofftype';
import { TimeofftypeModule } from 'src/app/entities/timeofftype/timeofftype.module';
import { timeofftypeRoute } from './timeofftype.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsExtendedModule } from 'src/app/extended/common/general-components/general-extended.module';

const entities = [
  TimeofftypeDetailsExtendedComponent,
  TimeofftypeListExtendedComponent,
  TimeofftypeNewExtendedComponent,
];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [timeofftypeRoute, TimeofftypeModule, SharedModule, GeneralComponentsExtendedModule],
  providers: [{ provide: TimeofftypeService, useClass: TimeofftypeExtendedService }],
})
export class TimeofftypeExtendedModule {}
