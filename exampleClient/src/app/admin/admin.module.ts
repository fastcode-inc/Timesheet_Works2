import { NgModule } from '@angular/core';

import { routingModule } from './admin.routing';
import { SharedModule } from 'src/app/common/shared';

const entities: any = [];

@NgModule({
  declarations: entities,
  exports: entities,
  imports: [routingModule, SharedModule],
})
export class AdminModule {}
