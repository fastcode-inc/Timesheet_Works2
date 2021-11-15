import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { GeneralListComponent } from './general-list/general-list.component';
import { GeneralNewComponent } from './general-new/general-new.component';
import { GeneralDetailsComponent } from './general-details/general-details.component';
import { FieldsComponent } from './fields/fields.component';

const components = [GeneralListComponent, GeneralNewComponent, GeneralDetailsComponent, FieldsComponent];
@NgModule({
  declarations: components,
  exports: components,
  imports: [SharedModule],
})
export class GeneralComponentsModule {}
