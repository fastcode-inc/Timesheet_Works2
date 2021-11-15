import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ListFiltersComponent } from './components/list-filters/list-filters.component';
import { VirtualScrollDirective } from './directives/virtualScroll/virtual-scroll.directive';
import { OptionsScrollDirective } from './directives/options-scroll.directive';
import { HelpDirective, IconComponent } from './directives/help.directive';
import { BaseDetailsComponent } from './base/base-details.component';
import { BaseListComponent } from './base/base-list.component';
import { BaseNewComponent } from './base/base-new.component';
import { PickerComponent } from './components/picker/picker.component';
import { MatFormFieldRequiredDirective } from './directives/mat-form-field-required.directive';

import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { ToolTipRendererDirective } from './directives/tool-tip-renderer.directive';
import { CustomToolTipComponent } from './components/custom-tool-tip/custom-tool-tip.component';
import { FlexLayoutModule } from '@angular/flex-layout';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    RouterModule,
    LayoutModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    FlexLayoutModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
  declarations: [
    ConfirmDialogComponent,
    ListFiltersComponent,
    VirtualScrollDirective,
    OptionsScrollDirective,
    HelpDirective,
    IconComponent,
    BaseDetailsComponent,
    BaseListComponent,
    BaseNewComponent,
    PickerComponent,
    MatFormFieldRequiredDirective,
    ToolTipRendererDirective,
    CustomToolTipComponent,
  ],
  exports: [
    ConfirmDialogComponent,
    ListFiltersComponent,
    VirtualScrollDirective,
    OptionsScrollDirective,
    HelpDirective,
    IconComponent,
    BaseDetailsComponent,
    BaseListComponent,
    BaseNewComponent,
    PickerComponent,
    MatFormFieldRequiredDirective,
    ToolTipRendererDirective,
    CustomToolTipComponent,

    CommonModule,
    LayoutModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    TranslateModule,
    FlexLayoutModule,
  ],
  entryComponents: [PickerComponent, ConfirmDialogComponent, IconComponent, CustomToolTipComponent],
})
export class SharedModule {}
