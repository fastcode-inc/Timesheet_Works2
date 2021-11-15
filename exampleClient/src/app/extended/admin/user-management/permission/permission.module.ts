import { NgModule } from '@angular/core';

import {
  PermissionExtendedService,
  PermissionDetailsExtendedComponent,
  PermissionListExtendedComponent,
  PermissionNewExtendedComponent,
} from './';
import { PermissionService } from 'src/app/admin/user-management/permission';
import { PermissionModule } from 'src/app/admin/user-management/permission/permission.module';
import { permissionRoute } from './permission.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsExtendedModule } from 'src/app/extended/common/general-components/general-extended.module';

const entities = [PermissionDetailsExtendedComponent, PermissionListExtendedComponent, PermissionNewExtendedComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [permissionRoute, PermissionModule, SharedModule, GeneralComponentsExtendedModule],
  providers: [{ provide: PermissionService, useClass: PermissionExtendedService }],
})
export class PermissionExtendedModule {}
