import { Component } from '@angular/core';
import { CreditPlanDashboardComponent } from './credit-plan-dashboard/credit-plan-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [CreditPlanDashboardComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'API-DOC';
}
