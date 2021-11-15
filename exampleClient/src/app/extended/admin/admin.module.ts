import { NgModule } from '@angular/core';

import { AdminModule } from 'src/app/admin/admin.module';

import { routingModule } from './admin.routing';
import { SharedModule } from 'src/app/common/shared';

const entities: any = [];

@NgModule({
  declarations: entities,
  exports: entities,
  imports: [routingModule, SharedModule, AdminModule],
})
export class AdminExtendedModule {}
