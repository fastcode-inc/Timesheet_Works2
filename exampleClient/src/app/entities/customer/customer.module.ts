import { NgModule } from '@angular/core';

import { CustomerDetailsComponent, CustomerListComponent, CustomerNewComponent } from './';
import { customerRoute } from './customer.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';

const entities = [CustomerDetailsComponent, CustomerListComponent, CustomerNewComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [customerRoute, SharedModule, GeneralComponentsModule],
})
export class CustomerModule {}
