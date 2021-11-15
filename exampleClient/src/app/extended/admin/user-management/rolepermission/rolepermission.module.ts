import { NgModule } from '@angular/core';

import {
  RolepermissionExtendedService,
  RolepermissionDetailsExtendedComponent,
  RolepermissionListExtendedComponent,
  RolepermissionNewExtendedComponent,
} from './';
import { RolepermissionService } from 'src/app/admin/user-management/rolepermission';
import { RolepermissionModule } from 'src/app/admin/user-management/rolepermission/rolepermission.module';
import { rolepermissionRoute } from './rolepermission.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsExtendedModule } from 'src/app/extended/common/general-components/general-extended.module';

const entities = [
  RolepermissionDetailsExtendedComponent,
  RolepermissionListExtendedComponent,
  RolepermissionNewExtendedComponent,
];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [rolepermissionRoute, RolepermissionModule, SharedModule, GeneralComponentsExtendedModule],
  providers: [{ provide: RolepermissionService, useClass: RolepermissionExtendedService }],
})
export class RolepermissionExtendedModule {}
