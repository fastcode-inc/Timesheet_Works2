import { NgModule } from '@angular/core';

import {
  UserspermissionExtendedService,
  UserspermissionDetailsExtendedComponent,
  UserspermissionListExtendedComponent,
  UserspermissionNewExtendedComponent,
} from './';
import { UserspermissionService } from 'src/app/admin/user-management/userspermission';
import { UserspermissionModule } from 'src/app/admin/user-management/userspermission/userspermission.module';
import { userspermissionRoute } from './userspermission.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsExtendedModule } from 'src/app/extended/common/general-components/general-extended.module';

const entities = [
  UserspermissionDetailsExtendedComponent,
  UserspermissionListExtendedComponent,
  UserspermissionNewExtendedComponent,
];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [userspermissionRoute, UserspermissionModule, SharedModule, GeneralComponentsExtendedModule],
  providers: [{ provide: UserspermissionService, useClass: UserspermissionExtendedService }],
})
export class UserspermissionExtendedModule {}
