import { Component } from '@angular/core';
import { DashboardComponent } from 'src/app/core/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardExtendedComponent extends DashboardComponent {}
