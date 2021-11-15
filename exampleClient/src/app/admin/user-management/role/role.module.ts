import { NgModule } from '@angular/core';

import { RoleDetailsComponent, RoleListComponent, RoleNewComponent } from './';
import { roleRoute } from './role.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [RoleDetailsComponent, RoleListComponent, RoleNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [roleRoute, SharedModule, GeneralComponentsModule],
})
export class RoleModule {}
