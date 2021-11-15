import { Routes } from '@angular/router';
import { EmailTemplateListComponent } from './email-editor/email-template-list.component';
import { TemplateEditorComponent } from './email-editor/template-editor.component';
import { EmailVariableListComponent } from './email-editor/email-variable/email-variable-list.component';
import { EmailVariableNewComponent } from './email-editor/email-variable/email-variable-new.component';
import { EmailVariableDetailComponent } from './email-editor/email-variable/email-variable-detail.component';
import { DataSourceListComponent } from './email-editor/data-source/data-source-list/data-source-list.component';
import { DataSourceDetailComponent } from './email-editor/data-source/data-source-detail/data-source-detail.component';

export const EmailRoutes: Routes = [
  { path: 'emailtemplate', component: EmailTemplateListComponent },
  { path: 'emailtemplate/:id', component: TemplateEditorComponent },
  { path: 'emailtemplateeditor', component: TemplateEditorComponent },
  { path: 'emailvariable', component: EmailVariableListComponent },
  { path: 'emailvariable', component: EmailVariableNewComponent },
  { path: 'emailvariable/:id', component: EmailVariableDetailComponent },
  { path: 'datasource', component: DataSourceListComponent },
  { path: 'datasource/:id', component: DataSourceDetailComponent },
];
