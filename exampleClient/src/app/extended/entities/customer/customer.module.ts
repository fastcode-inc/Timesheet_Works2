import { NgModule } from '@angular/core';

import {
  CustomerExtendedService,
  CustomerDetailsExtendedComponent,
  CustomerListExtendedComponent,
  CustomerNewExtendedComponent,
} from './';
import { CustomerService } from 'src/app/entities/customer';
import { CustomerModule } from 'src/app/entities/customer/customer.module';
import { customerRoute } from './customer.route';

import { SharedModule } from 'src/app/common/shared';
import { GeneralComponentsExtendedModule } from 'src/app/extended/common/general-components/general-extended.module';

const entities = [CustomerDetailsExtendedComponent, CustomerListExtendedComponent, CustomerNewExtendedComponent];
@NgModule({
  declarations: entities,
  exports: entities,
  imports: [customerRoute, CustomerModule, SharedModule, GeneralComponentsExtendedModule],
  providers: [{ provide: CustomerService, useClass: CustomerExtendedService }],
})
export class CustomerExtendedModule {}
