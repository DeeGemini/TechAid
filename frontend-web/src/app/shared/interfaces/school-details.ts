export interface SchoolDetails {
    name: string;
    address: string;
    contactPerson: string;
    email: string;
    phone?: string;
    studentCount: number;
    verificationStatus: string;
    rejectionReason?: string;
    registrationDate: Date;
    // Add other relevant details
  }