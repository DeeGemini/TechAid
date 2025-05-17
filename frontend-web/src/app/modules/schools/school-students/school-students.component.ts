import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Student {
  id: string;
  name: string;
  grade: string;
  studentId: string;
  contact: {
    email?: string;
    phone?: string;
    guardian?: string;
  };
  device?: {
    type: string;
    serialNumber: string;
    assignedDate: Date;
    condition: 'excellent' | 'good' | 'fair' | 'poor';
  };
  hotspotAccess?: {
    location: string;
    accessCode: string;
    expiryDate?: Date;
  };
  status: 'active' | 'inactive' | 'graduated';
}

@Component({
  selector: 'app-school-students',
  templateUrl: './school-students.component.html',
  styleUrls: ['./school-students.component.scss']
})
export class SchoolStudentsComponent implements OnInit {
  showStudentForm = false;
  isEditing = false;
  currentStudentId: string | null = null;
  studentForm: FormGroup;
  viewMode: 'list' | 'grid' = 'list';
  selectedStatus = 'all';

  grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 
           'Grade 6', 'Grade 7', 'Grade 8', 'Form 1', 'Form 2', 
           'Form 3', 'Form 4'];

  statusOptions = [
    { value: 'all', label: 'All Students' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'graduated', label: 'Graduated' }
  ];

  students: Student[] = [
    {
      id: 'STU-001',
      name: 'Jane Muthoni',
      grade: 'Form 2',
      studentId: 'SCH-2023-001',
      contact: {
        email: 'jane.m@school.edu',
        phone: '+254712345678',
        guardian: 'Mrs. Muthoni'
      },
      device: {
        type: 'Laptop',
        serialNumber: 'LT-2023-001',
        assignedDate: new Date('2023-02-15'),
        condition: 'good'
      },
      hotspotAccess: {
        location: 'Community Tech Center',
        accessCode: 'HT-2023-001',
        expiryDate: new Date('2023-12-31')
      },
      status: 'active'
    },
    {
      id: 'STU-002',
      name: 'John Kamau',
      grade: 'Form 4',
      studentId: 'SCH-2023-002',
      contact: {
        phone: '+254723456789',
        guardian: 'Mr. Kamau'
      },
      device: {
        type: 'Tablet',
        serialNumber: 'TB-2023-002',
        assignedDate: new Date('2023-03-10'),
        condition: 'excellent'
      },
      status: 'active'
    },
    {
      id: 'STU-003',
      name: 'Mary Achieng',
      grade: 'Grade 7',
      studentId: 'SCH-2023-003',
      contact: {
        guardian: 'Mrs. Achieng'
      },
      hotspotAccess: {
        location: 'Library Public WiFi',
        accessCode: 'HT-2023-003'
      },
      status: 'active'
    },
    {
      id: 'STU-004',
      name: 'Peter Omondi',
      grade: 'Form 4',
      studentId: 'SCH-2022-001',
      contact: {
        email: 'peter.o@school.edu',
        phone: '+254734567890'
      },
      status: 'graduated'
    },
    {
      id: 'STU-005',
      name: 'Susan Wanjiku',
      grade: 'Grade 5',
      studentId: 'SCH-2023-005',
      contact: {
        guardian: 'Mr. Wanjiku'
      },
      status: 'inactive'
    }
  ];

  filteredStudents: Student[] = [];

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      grade: ['', Validators.required],
      studentId: ['', Validators.required],
      email: [''],
      phone: [''],
      guardian: [''],
      status: ['active', Validators.required]
    });
  }

  ngOnInit(): void {
    this.filterStudents();
  }

  filterStudents(): void {
    if (this.selectedStatus === 'all') {
      this.filteredStudents = [...this.students];
    } else {
      this.filteredStudents = this.students.filter(student => student.status === this.selectedStatus);
    }
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
  }

  openAddStudentForm(): void {
    this.isEditing = false;
    this.currentStudentId = null;
    this.studentForm.reset({
      name: '',
      grade: '',
      studentId: '',
      email: '',
      phone: '',
      guardian: '',
      status: 'active'
    });
    this.showStudentForm = true;
  }

  openEditStudentForm(student: Student): void {
    this.isEditing = true;
    this.currentStudentId = student.id;
    this.studentForm.patchValue({
      name: student.name,
      grade: student.grade,
      studentId: student.studentId,
      email: student.contact.email || '',
      phone: student.contact.phone || '',
      guardian: student.contact.guardian || '',
      status: student.status
    });
    this.showStudentForm = true;
  }

  submitStudentForm(): void {
    if (this.studentForm.valid) {
      const formValue = this.studentForm.value;
      const studentData: Student = {
        id: this.isEditing && this.currentStudentId ? this.currentStudentId : `STU-${new Date().getFullYear()}-${this.padNumber(this.students.length + 1, 3)}`,
        name: formValue.name,
        grade: formValue.grade,
        studentId: formValue.studentId,
        contact: {
          email: formValue.email || undefined,
          phone: formValue.phone || undefined,
          guardian: formValue.guardian || undefined
        },
        status: formValue.status
      };

      if (this.isEditing && this.currentStudentId) {
        // Find and update existing student
        const index = this.students.findIndex(s => s.id === this.currentStudentId);
        if (index !== -1) {
          // Preserve device and hotspot data
          studentData.device = this.students[index].device;
          studentData.hotspotAccess = this.students[index].hotspotAccess;
          this.students[index] = studentData;
        }
      } else {
        this.students.unshift(studentData);
      }

      this.filterStudents();
      this.showStudentForm = false;
    }
  }

  assignDevice(student: Student): void {
    // In a real app, this would open a modal for device assignment
    console.log(`Assign device to ${student.name}`);
  }

  grantHotspotAccess(student: Student): void {
    // In a real app, this would open a modal for hotspot assignment
    console.log(`Grant hotspot access to ${student.name}`);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'graduated': return 'status-graduated';
      default: return '';
    }
  }

  getDeviceConditionClass(condition?: string): string {
    switch (condition) {
      case 'excellent': return 'condition-excellent';
      case 'good': return 'condition-good';
      case 'fair': return 'condition-fair';
      case 'poor': return 'condition-poor';
      default: return '';
    }
  }

  private padNumber(num: number, size: number): string {
    let s = num.toString();
    while (s.length < size) s = '0' + s;
    return s;
  }
}