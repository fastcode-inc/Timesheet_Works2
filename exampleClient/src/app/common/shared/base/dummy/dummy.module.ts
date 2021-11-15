import { NgModule } from '@angular/core';
import { GeneralComponentsModule } from 'src/app/common/general-components/general.module';
import { SharedModule } from 'src/app/common/shared';
import { DummyDetailsComponent } from './dummy-details.component';
import { DummyListComponent } from './dummy-list.component';
import { DummyNewComponent } from './dummy-new.component';

const components = [DummyListComponent, DummyDetailsComponent, DummyNewComponent];
@NgModule({
  declarations: components,
  imports: [GeneralComponentsModule, SharedModule],
})
export class DummyModule {}
