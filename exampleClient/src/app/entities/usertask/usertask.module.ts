import { NgModule } from '@angular/core';

import { UsertaskDetailsComponent, UsertaskListComponent, UsertaskNewComponent } from './';
import { usertaskRoute } from './usertask.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [UsertaskDetailsComponent, UsertaskListComponent, UsertaskNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [usertaskRoute, SharedModule, GeneralComponentsModule],
})
export class UsertaskModule {}
