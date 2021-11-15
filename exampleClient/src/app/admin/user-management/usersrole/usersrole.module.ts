import { NgModule } from '@angular/core';

import { UsersroleDetailsComponent, UsersroleListComponent, UsersroleNewComponent } from './';
import { usersroleRoute } from './usersrole.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [UsersroleDetailsComponent, UsersroleListComponent, UsersroleNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [usersroleRoute, SharedModule, GeneralComponentsModule],
})
export class UsersroleModule {}
