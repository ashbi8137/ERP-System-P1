import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { AcadStudent, StudentSemesterPlanStatus } from '../../model/student.model'; 

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-student-list',
  templateUrl: './student-list.component.html'
})

export class StudentListComponent implements OnInit {

  students: AcadStudent[] = [];
  selectedTab: 'pending' | 'accepted' | 'rejected' = 'pending';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ adviseedetails: AcadStudent[] }>('assets/student-data.json').subscribe({
      next: (data) => {this.students = data.adviseedetails;},
      });
    }

  selectStudent(student: AcadStudent) {
      this.studentSelected.emit(student);
  }
  @Output() studentSelected = new EventEmitter<AcadStudent>();
   
  getStudentTabStatus(student: AcadStudent): string {
    if (!student.acceptedSemesterPlans || student.acceptedSemesterPlans.length == 0) {
      return 'pending';
    }
    const plan = student.acceptedSemesterPlans[0];
    if (!plan || !plan.status) return 'pending';
    if (plan.status == StudentSemesterPlanStatus.ACCEPTED) return 'accepted';
    if (plan.status == StudentSemesterPlanStatus.REJECTED) return 'rejected';
    return 'pending';
  }

  get filteredStudents(): AcadStudent[] {
    if (!this.students) return [];
    return this.students.filter(student => this.getStudentTabStatus(student) == this.selectedTab);
  }
  
}
