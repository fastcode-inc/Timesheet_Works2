import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

// import { CustomerDetailsComponent, CustomerListComponent, CustomerNewComponent } from './';

const routes: Routes = [
  // { path: '', component: CustomerListComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: ':id', component: CustomerDetailsComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: 'new', component: CustomerNewComponent, canActivate: [ AuthGuard ] },
];

export const customerRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
