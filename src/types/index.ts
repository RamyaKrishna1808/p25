export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  maxScore: number;
  fileTypes: string[];
  createdBy: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  fileName: string;
  fileUrl: string;
  submittedAt: Date;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export interface Filter {
  status?: string;
  search?: string;
  sortBy?: 'date' | 'name' | 'grade';
}
