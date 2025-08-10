import { UIDate } from './uidate.model';

export class ERPID {
  type: string;
  uuid: string;

  constructor(type: string, uuid: string) {
    this.type = type;
    this.uuid = uuid;
  }

  equals(other: ERPID) {
    return other.type == this.type && other.uuid == this.uuid;
  }

  static emptyID(): ERPID {
    return new ERPID('', '');
  }
}

export interface AcadCatCreditPlan {
 catShortCode: string;
 definedCourses: ERPID[];
 otherCourses: ERPID[];
}

export interface Remark {
 who: string;
 what: string;
 date: UIDate;
}

export interface StudentSemesterPlan {
 id: ERPID;
 studentID: ERPID;
 status: StudentSemesterPlanStatus;
 submitDate: UIDate; 
catCreditPlans: AcadCatCreditPlan[];
 safePlan: boolean;
 remark: Remark;  
}

export enum StudentSemesterPlanStatus {
  SUBMITTED = 'SUBMITTED',
  WAITFORAPPROVAL = 'WAITFORAPPROVAL',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
 }

export interface AcadStudent {
 id: ERPID;
 name: string;
 latestCurriculumID: ERPID;
 pastCurriculumIDs: ERPID[];
 latestRollNo: string;
 pastRollNos: string[];
 studentSemTranscriptIDs: ERPID[];
 acceptedSemesterPlans: StudentSemesterPlan[];
 cgpa: number;
 reason?: string;
}

export interface OfferedCourse {
  courseID: ERPID;
  courseView: {
    info: {
      courseType: string;
      courseCode: {
        code: string;
      };
      credits: number;
    };
  };
  classSlotNames: string[];
  primaryInstructorID: {
    name: string;
  };
}




