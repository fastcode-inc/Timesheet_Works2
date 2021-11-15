import { NgModule } from '@angular/core';

import { PermissionDetailsComponent, PermissionListComponent, PermissionNewComponent } from './';
import { permissionRoute } from './permission.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [PermissionDetailsComponent, PermissionListComponent, PermissionNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [permissionRoute, SharedModule, GeneralComponentsModule],
})
export class PermissionModule {}
