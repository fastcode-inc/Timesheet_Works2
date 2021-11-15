import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

// import { TimeofftypeDetailsComponent, TimeofftypeListComponent, TimeofftypeNewComponent } from './';

const routes: Routes = [
  // { path: '', component: TimeofftypeListComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: ':id', component: TimeofftypeDetailsComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: 'new', component: TimeofftypeNewComponent, canActivate: [ AuthGuard ] },
];

export const timeofftypeRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
