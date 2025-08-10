import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AcadStudent, ERPID, OfferedCourse, StudentSemesterPlan } from '../../model/student.model';
import { UIDate } from '../../model/uidate.model';

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-student-details',
  templateUrl: './student-details.component.html'
})

export class StudentDetailsComponent {

  @Input() student: AcadStudent | null = null;
  planDetails: StudentSemesterPlan | null = null;
  offeredCourses: OfferedCourse[] = [];
  searchTerm: string = '';
  allStudents: AcadStudent[] = [];
  offeredCoursesLoaded = false;
  remarks: string = '';
  warningMessage: string = '';
  formattedSubmitDate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ offeredcourses: OfferedCourse[], adviseedetails: AcadStudent[] }>('assets/student-data.json').subscribe(data => {
      this.offeredCourses = data.offeredcourses;
      this.offeredCoursesLoaded = true;
      this.allStudents = data.adviseedetails;
      this.updatePlanAndCourses();
    });
  }

  updatePlanAndCourses() {
    if (this.student && this.student.acceptedSemesterPlans.length > 0) {
        this.planDetails = this.student.acceptedSemesterPlans[0];
        const submitDate = this.planDetails.submitDate;
        if (UIDate.isUIDate(submitDate)) {
          this.formattedSubmitDate = UIDate.toDateString(submitDate, true);
        } 
        else {
          this.formattedSubmitDate = 'Invalid date';
        }
    } 
    else {
        this.planDetails = null;
        this.formattedSubmitDate = '';
    }
    this.remarks = '';
    this.warningMessage = '';
  }

  ngOnChanges() {
    console.log('Student in details:', this.student);
    this.updatePlanAndCourses();
  }

  @Output() statusChange = new EventEmitter<{ id: ERPID, newStatus: string }>();

  acceptStudent() {
    if (!this.remarks.trim()) {
      this.warningMessage = 'Please enter remarks before accepting.';
      return;
    }
    this.warningMessage = '';
    if (this.planDetails && this.planDetails.remark) {
      this.planDetails.remark.what = this.remarks;
    }
    if (this.student) {
      this.statusChange.emit({ id: this.student.id, newStatus: 'accepted' });
    }
    this.remarks = '';
  }

  rejectStudent() {
    if (!this.remarks.trim()) {
      this.warningMessage = 'Please enter remarks before rejecting.';
      return;
    }
    this.warningMessage = '';
    if (this.planDetails && this.planDetails.remark) {
      this.planDetails.remark.what = this.remarks;
    }
    if (this.student) {
      this.statusChange.emit({ id: this.student.id, newStatus: 'rejected' });
    }
    this.remarks = '';
  }

  getCourseInfo(uuid: string): OfferedCourse | undefined {
    return this.offeredCourses.find(oc => oc.courseID.uuid == uuid);
  }

  mapCourseTypeToLabel(courseType?: string): string {
    if (courseType == 'Core') return 'IC';
    if (courseType == 'Elective') return 'PME';
    return 'SME'; 
  }
  
 // Groups courses by type and calculates total credits per group
  groupCoursesByType(): { label: string; courses: OfferedCourse[]; totalCredits: number }[] {
  const grouped: { [label: string]: OfferedCourse[] } = {};

    for (const cat of this.planDetails?.catCreditPlans || []) {
      const allCourses = [...cat.definedCourses, ...cat.otherCourses];

      for (const ref of allCourses) {
        const course = this.getCourseInfo(ref.uuid);
        if (!course) continue;

        const label = this.mapCourseTypeToLabel(course.courseView?.info?.courseType);
        grouped[label] = grouped[label] || [];
        grouped[label].push(course);
      }
    }

    return Object.entries(grouped).map(([label, courses]) => ({
      label,
      courses,
      totalCredits: courses.reduce((sum, c) => sum + (c.courseView?.info?.credits || 0), 0)
    }));
  }

  // Uses grouped data to get overall total credits
  getTotalCredits(): number {
    return this.groupCoursesByType()
              .reduce((sum, group) => sum + group.totalCredits, 0);
  }
    
  get filteredStudents(): AcadStudent[] {
    if (!this.searchTerm) return [];
    return this.allStudents.filter(student =>
      student.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())
    );
  }

  selectSearchedStudent(student: AcadStudent) {
    this.student = student;
    this.searchTerm = '';
    this.updatePlanAndCourses();
  }
}