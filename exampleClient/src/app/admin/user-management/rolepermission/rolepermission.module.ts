import { NgModule } from '@angular/core';

import { RolepermissionDetailsComponent, RolepermissionListComponent, RolepermissionNewComponent } from './';
import { rolepermissionRoute } from './rolepermission.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [RolepermissionDetailsComponent, RolepermissionListComponent, RolepermissionNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [rolepermissionRoute, SharedModule, GeneralComponentsModule],
})
export class RolepermissionModule {}
