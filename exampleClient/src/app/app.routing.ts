import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SwaggerComponent } from './core/swagger/swagger.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./extended/core/core.module').then((m) => m.CoreExtendedModule),
  },
  { path: 'swagger-ui', component: SwaggerComponent, canActivate: [AuthGuard] },
  {
    path: '',
    loadChildren: () => import('./extended/admin/admin.module').then((m) => m.AdminExtendedModule),
  },
  {
    path: '',
    loadChildren: () => import('./extended/account/account.module').then((m) => m.AccountExtendedModule),
  },
  {
    path: 'project',
    loadChildren: () => import('./extended/entities/project/project.module').then((m) => m.ProjectExtendedModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'timesheetstatus',
    loadChildren: () =>
      import('./extended/entities/timesheetstatus/timesheetstatus.module').then((m) => m.TimesheetstatusExtendedModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'timeofftype',
    loadChildren: () =>
      import('./extended/entities/timeofftype/timeofftype.module').then((m) => m.TimeofftypeExtendedModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'timesheet',
    loadChildren: () => import('./extended/entities/timesheet/timesheet.module').then((m) => m.TimesheetExtendedModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'task',
    loadChildren: () => import('./extended/entities/task/task.module').then((m) => m.TaskExtendedModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'timesheetdetails',
    loadChildren: () =>
      import('./extended/entities/timesheetdetails/timesheetdetails.module').then(
        (m) => m.TimesheetdetailsExtendedModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'usertask',
    loadChildren: () => import('./extended/entities/usertask/usertask.module').then((m) => m.UsertaskExtendedModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'customer',
    loadChildren: () => import('./extended/entities/customer/customer.module').then((m) => m.CustomerExtendedModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'email',
    loadChildren: () => import('./email-builder/ip-email-builder.module').then((m) => m.IpEmailBuilderModule),
    canActivate: [AuthGuard],
  },
  { path: '**', component: ErrorPageComponent },
];

export const routingModule: ModuleWithProviders<any> = RouterModule.forRoot(routes);
