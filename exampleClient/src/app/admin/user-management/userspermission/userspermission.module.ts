import { NgModule } from '@angular/core';

import { UserspermissionDetailsComponent, UserspermissionListComponent, UserspermissionNewComponent } from './';
import { userspermissionRoute } from './userspermission.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [UserspermissionDetailsComponent, UserspermissionListComponent, UserspermissionNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [userspermissionRoute, SharedModule, GeneralComponentsModule],
})
export class UserspermissionModule {}
