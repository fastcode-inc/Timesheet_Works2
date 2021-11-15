import { NgModule } from '@angular/core';

import {
  UsertaskExtendedService,
  UsertaskDetailsExtendedComponent,
  UsertaskListExtendedComponent,
  UsertaskNewExtendedComponent,
} from './';
import { UsertaskService } from 'src/app/entities/usertask';
import { UsertaskModule } from 'src/app/entities/usertask/usertask.module';
import { usertaskRoute } from './usertask.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsExtendedModule } from 'src/app/extended/common/general-components/general-extended.module';

const entities = [UsertaskDetailsExtendedComponent, UsertaskListExtendedComponent, UsertaskNewExtendedComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [usertaskRoute, UsertaskModule, SharedModule, GeneralComponentsExtendedModule],
  providers: [{ provide: UsertaskService, useClass: UsertaskExtendedService }],
})
export class UsertaskExtendedModule {}
