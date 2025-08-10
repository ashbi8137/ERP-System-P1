import { Component } from '@angular/core';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AcadStudent, ERPID, StudentSemesterPlanStatus } from '../model/student.model';

@Component({
  selector: 'app-credit-plan-dashboard',
  imports: [StudentDetailsComponent, StudentListComponent],
  templateUrl: './credit-plan-dashboard.component.html',
  styleUrls: ['./credit-plan-dashboard.component.scss']
})    
export class CreditPlanDashboardComponent {
  
  selectedStudent: AcadStudent | null = null;

  onStudentSelected(student: AcadStudent) {
    this.selectedStudent = student;
  }
  
  onStatusChange(event: { id: ERPID, newStatus: string }) {
    if (!this.selectedStudent || !this.selectedStudent.acceptedSemesterPlans) return;
    let plan = this.selectedStudent.acceptedSemesterPlans[0];
    if (plan) {
      plan.status = event.newStatus == 'accepted' ? StudentSemesterPlanStatus.ACCEPTED : StudentSemesterPlanStatus.REJECTED;
    }
    this.selectedStudent = null;
  }

}
