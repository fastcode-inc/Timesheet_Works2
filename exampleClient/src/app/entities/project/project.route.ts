import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

// import { ProjectDetailsComponent, ProjectListComponent, ProjectNewComponent } from './';

const routes: Routes = [
  // { path: '', component: ProjectListComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: ':id', component: ProjectDetailsComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: 'new', component: ProjectNewComponent, canActivate: [ AuthGuard ] },
];

export const projectRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
