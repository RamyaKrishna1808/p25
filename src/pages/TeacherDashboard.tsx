import React, { useState, useMemo } from 'react';
import type { Assignment, Submission, Filter } from '../types';
import { useToast } from '../context/ToastContext';
import AssignmentCard from '../components/AssignmentCard';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import SubmissionGrading from '../components/SubmissionGrading';
import { Plus, Search } from 'lucide-react';
import '../styles/dashboard.css';

const TeacherDashboard: React.FC = () => {
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
      status: 'submitted',
    },
    {
      id: 's2',
      assignmentId: '2',
      studentId: 'student2',
      studentName: 'Jane Smith',
      fileName: 'react-app.zip',
      fileUrl: '#',
      submittedAt: new Date(),
      status: 'pending',
    },
  ]);

  const [filters, setFilters] = useState<Filter>({ status: '', search: '' });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isGradingOpen, setIsGradingOpen] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    maxScore: 100,
  });
  const { addToast } = useToast();

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(submission => {
      const assignment = assignments.find(a => a.id === submission.assignmentId);
      const searchMatch = assignment?.title.toLowerCase().includes(filters.search?.toLowerCase() || '') ||
        submission.studentName.toLowerCase().includes(filters.search?.toLowerCase() || '');
      const statusMatch = !filters.status || submission.status === filters.status;
      return searchMatch && statusMatch;
    });
  }, [submissions, assignments, filters]);

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAssignment.title || !newAssignment.description || !newAssignment.dueDate) {
      addToast('Please fill in all fields', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const assignment: Assignment = {
        id: Date.now().toString(),
        title: newAssignment.title,
        description: newAssignment.description,
        dueDate: new Date(newAssignment.dueDate),
        maxScore: newAssignment.maxScore,
        fileTypes: ['.pdf', '.doc', '.docx', '.txt', '.zip'],
        createdBy: 'teacher1',
      };

      setAssignments([...assignments, assignment]);
      addToast(`Assignment "${assignment.title}" created successfully!`, 'success');
      setIsCreateOpen(false);
      setNewAssignment({
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        maxScore: 100,
      });
    } catch (error) {
      addToast('Failed to create assignment', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedSubmission = submissions.find(s => s.id === selectedSubmissionId);
  const selectedAssignment = selectedSubmission ? assignments.find(a => a.id === selectedSubmission.assignmentId) : null;

  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h1 className="dashboard-title">📋 Manage Assignments</h1>
          <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
            <Plus size={18} />
            New Assignment
          </button>
        </div>
        <p className="dashboard-subtitle">Create assignments and grade student submissions</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search assignments or students..."
            value={filters.search || ''}
            onChange={e => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <select
          className="filter-select"
          value={filters.status || ''}
          onChange={e => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Submissions</option>
          <option value="pending">Pending</option>
          <option value="submitted">Submitted</option>
          <option value="graded">Graded</option>
        </select>
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'var(--text-primary)' }}>
        Submissions to Grade
      </h2>
      <div className="assignments-grid">
        {filteredSubmissions.map(submission => {
          const assignment = assignments.find(a => a.id === submission.assignmentId);
          return assignment ? (
            <div key={submission.id} className="card assignment-card">
              <div style={{ marginBottom: '15px' }}>
                <h3 className="assignment-title">{assignment.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {submission.studentName}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Status: {submission.status}
                </p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedSubmissionId(submission.id);
                  setIsGradingOpen(true);
                }}
                style={{ width: '100%' }}
              >
                {submission.status === 'graded' ? 'View Grade' : 'Grade Submission'}
              </button>
            </div>
          ) : null;
        })}
      </div>

      {filteredSubmissions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
          <p>No submissions to grade</p>
        </div>
      )}

      {/* Create Assignment Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Assignment"
        footer={
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={() => setIsCreateOpen(false)} disabled={isLoading}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleCreateAssignment} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Assignment'}
            </button>
          </div>
        }
      >
        {isLoading && <LoadingSpinner label="Creating assignment..." />}
        {!isLoading && (
          <form>
            <div className="input-group">
              <label>Title</label>
              <input
                type="text"
                value={newAssignment.title}
                onChange={e => setNewAssignment({ ...newAssignment, title: e.target.value })}
                placeholder="Assignment title"
              />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea
                value={newAssignment.description}
                onChange={e => setNewAssignment({ ...newAssignment, description: e.target.value })}
                placeholder="Assignment description"
              />
            </div>
            <div className="input-group">
              <label>Due Date</label>
              <input
                type="date"
                value={newAssignment.dueDate}
                onChange={e => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label>Max Score</label>
              <input
                type="number"
                min="0"
                value={newAssignment.maxScore}
                onChange={e => setNewAssignment({ ...newAssignment, maxScore: parseInt(e.target.value) })}
              />
            </div>
          </form>
        )}
      </Modal>

      {/* Grading Modal */}
      <Modal
        isOpen={!!(isGradingOpen && selectedSubmission && selectedAssignment)}
        onClose={() => {
          setIsGradingOpen(false);
          setSelectedSubmissionId(null);
        }}
        title={`Grade: ${selectedSubmission?.studentName} - ${selectedAssignment?.title}`}
      >
        {selectedSubmission && selectedAssignment && (
          <SubmissionGrading submission={selectedSubmission} assignment={selectedAssignment} isTeacher={true} />
        )}
      </Modal>
    </div>
  );
};

export default TeacherDashboard;
