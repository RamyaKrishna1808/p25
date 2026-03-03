import React, { useState, useMemo } from 'react';
import type { Assignment, Submission, Filter } from '../types';
import { useToast } from '../context/ToastContext';
import AssignmentCard from '../components/AssignmentCard';
import Modal from '../components/Modal';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search } from 'lucide-react';
import '../styles/dashboard.css';

const StudentDashboard: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript including variables, functions, and ES6 syntax.',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      maxScore: 100,
      fileTypes: ['.js', '.jsx', '.txt'],
      createdBy: 'teacher1',
    },
    {
      id: '2',
      title: 'React Tutorial',
      description: 'Build a simple React application with hooks and state management.',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      maxScore: 100,
      fileTypes: ['.jsx', '.tsx', '.zip'],
      createdBy: 'teacher1',
    },
    {
      id: '3',
      title: 'Database Design',
      description: 'Design a relational database schema for an e-commerce application.',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      maxScore: 100,
      fileTypes: ['.sql', '.pdf', '.doc'],
      createdBy: 'teacher2',
    },
  ]);

  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 's1',
      assignmentId: '1',
      studentId: 'student1',
      studentName: 'John Doe',
      fileName: 'solution.js',
      fileUrl: '#',
      submittedAt: new Date(),
      status: 'graded',
      grade: 85,
      feedback: 'Good work! Your code is clean and well-structured.',
    },
  ]);

  const [filters, setFilters] = useState<Filter>({ status: '', search: '' });
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      const searchMatch = assignment.title.toLowerCase().includes(filters.search?.toLowerCase() || '');
      const submission = submissions.find(s => s.assignmentId === assignment.id);
      const statusMatch = !filters.status || submission?.status === filters.status;
      return searchMatch && statusMatch;
    });
  }, [assignments, submissions, filters]);

  const handleSubmitAssignment = async (files: FileList) => {
    if (!selectedAssignmentId) return;

    setIsLoading(true);
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newSubmission: Submission = {
        id: Date.now().toString(),
        assignmentId: selectedAssignmentId,
        studentId: 'student1',
        studentName: 'Current Student',
        fileName: files[0].name,
        fileUrl: URL.createObjectURL(files[0]),
        submittedAt: new Date(),
        status: 'submitted',
      };

      setSubmissions([...submissions.filter(s => s.assignmentId !== selectedAssignmentId), newSubmission]);
      addToast(`Assignment "${assignments.find(a => a.id === selectedAssignmentId)?.title}" submitted successfully!`, 'success');
      setIsSubmitOpen(false);
    } catch (error) {
      addToast('Failed to submit assignment', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">📖 My Assignments</h1>
        <p className="dashboard-subtitle">Track your assignments, submissions, and grades</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search assignments..."
            value={filters.search || ''}
            onChange={e => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <select
          className="filter-select"
          value={filters.status || ''}
          onChange={e => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="submitted">Submitted</option>
          <option value="graded">Graded</option>
        </select>
      </div>

      <div className="assignments-grid">
        {filteredAssignments.map(assignment => {
          const submission = submissions.find(s => s.assignmentId === assignment.id);
          return (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              submission={submission}
              onSubmit={() => {
                setSelectedAssignmentId(assignment.id);
                setIsSubmitOpen(true);
              }}
            />
          );
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
          <p>No assignments found</p>
        </div>
      )}

      <Modal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        title={`Submit: ${assignments.find(a => a.id === selectedAssignmentId)?.title}`}
        footer={
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={() => setIsSubmitOpen(false)} disabled={isLoading}>
              Cancel
            </button>
          </div>
        }
      >
        {isLoading ? (
          <LoadingSpinner label="Uploading file..." />
        ) : (
          <div>
            <p style={{ marginBottom: '15px', color: 'var(--text-secondary)' }}>
              Upload your solution file for this assignment.
            </p>
            <FileUpload
              onFileSelect={handleSubmitAssignment}
              allowedTypes={assignments.find(a => a.id === selectedAssignmentId)?.fileTypes || []}
              disabled={isLoading}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentDashboard;
