import React from 'react';
import type { Assignment, Submission } from '../types';
import { formatDate } from '../utils/dateUtils';
import StatusBadge from './StatusBadge';
import CountdownTimer from './CountdownTimer';
import { Eye, Download, Trash2 } from 'lucide-react';
import '../styles/dashboard.css';

interface AssignmentCardProps {
  assignment: Assignment;
  submission?: Submission;
  onViewDetails?: () => void;
  onSubmit?: () => void;
  onGrade?: () => void;
  onDelete?: () => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  submission,
  onViewDetails,
  onSubmit,
  onGrade,
  onDelete,
}) => {
  const isGraded = submission?.status === 'graded';
  const isSubmitted = submission?.status === 'submitted';
  const isPending = submission?.status === 'pending';

  return (
    <div className="card assignment-card">
      <div className="assignment-header">
        <div>
          <h3 className="assignment-title">{assignment.title}</h3>
          <p className="assignment-due">Due: {formatDate(assignment.dueDate)}</p>
        </div>
        <CountdownTimer dueDate={assignment.dueDate} />
      </div>

      <p className="assignment-description">{assignment.description}</p>

      <div className="assignment-meta">
        <span>Score: {assignment.maxScore} points</span>
        {isGraded && submission && (
          <span style={{ color: 'var(--success)', fontWeight: '600' }}>Grade: {submission.grade}/{assignment.maxScore}</span>
        )}
      </div>

      {submission && (
        <div style={{ marginBottom: '15px' }}>
          <StatusBadge status={submission.status} />
          {isGraded && submission.feedback && (
            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'var(--neutral-100)', borderRadius: '6px' }}>
              <p style={{ fontSize: '12px', fontWeight: '600', marginBottom: '5px', color: 'var(--text-secondary)' }}>Feedback:</p>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{submission.feedback}</p>
            </div>
          )}
        </div>
      )}

      <div className="assignment-actions">
        {onViewDetails && (
          <button className="btn btn-secondary" onClick={onViewDetails}>
            <Eye size={16} />
            View
          </button>
        )}
        {!submission && onSubmit && (
          <button className="btn btn-primary" onClick={onSubmit}>
            Submit
          </button>
        )}
        {onGrade && (
          <button className="btn btn-primary" onClick={onGrade}>
            Grade
          </button>
        )}
        {onDelete && (
          <button className="btn btn-danger" onClick={onDelete}>
            <Trash2 size={16} />
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
