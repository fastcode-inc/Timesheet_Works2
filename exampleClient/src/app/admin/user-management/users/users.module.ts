import { NgModule } from '@angular/core';

import { UsersDetailsComponent, UsersListComponent, UsersNewComponent } from './';
import { usersRoute } from './users.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [UsersDetailsComponent, UsersListComponent, UsersNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [usersRoute, SharedModule, GeneralComponentsModule],
})
export class UsersModule {}
