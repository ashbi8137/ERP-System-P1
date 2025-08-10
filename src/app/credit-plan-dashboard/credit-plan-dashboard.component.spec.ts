import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPlanDashboardComponent } from './credit-plan-dashboard.component';

describe('CreditPlanDashboardComponent', () => {
  let component: CreditPlanDashboardComponent;
  let fixture: ComponentFixture<CreditPlanDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditPlanDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditPlanDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
