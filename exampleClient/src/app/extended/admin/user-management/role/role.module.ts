import { NgModule } from '@angular/core';

import {
  RoleExtendedService,
  RoleDetailsExtendedComponent,
  RoleListExtendedComponent,
  RoleNewExtendedComponent,
} from './';
import { RoleService } from 'src/app/admin/user-management/role';
import { RoleModule } from 'src/app/admin/user-management/role/role.module';
import { roleRoute } from './role.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsExtendedModule } from 'src/app/extended/common/general-components/general-extended.module';

const entities = [RoleDetailsExtendedComponent, RoleListExtendedComponent, RoleNewExtendedComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [roleRoute, RoleModule, SharedModule, GeneralComponentsExtendedModule],
  providers: [{ provide: RoleService, useClass: RoleExtendedService }],
})
export class RoleExtendedModule {}
