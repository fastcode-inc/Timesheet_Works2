import { NgModule } from '@angular/core';

import {
  UsersroleExtendedService,
  UsersroleDetailsExtendedComponent,
  UsersroleListExtendedComponent,
  UsersroleNewExtendedComponent,
} from './';
import { UsersroleService } from 'src/app/admin/user-management/usersrole';
import { UsersroleModule } from 'src/app/admin/user-management/usersrole/usersrole.module';
import { usersroleRoute } from './usersrole.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsExtendedModule } from 'src/app/extended/common/general-components/general-extended.module';

const entities = [UsersroleDetailsExtendedComponent, UsersroleListExtendedComponent, UsersroleNewExtendedComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [usersroleRoute, UsersroleModule, SharedModule, GeneralComponentsExtendedModule],
  providers: [{ provide: UsersroleService, useClass: UsersroleExtendedService }],
})
export class UsersroleExtendedModule {}
