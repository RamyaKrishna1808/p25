import React, { useState } from 'react';
import type { Submission, Assignment } from '../types';
import { useToast } from '../context/ToastContext';
import FileUpload from './FileUpload';
import LoadingSpinner from './LoadingSpinner';
import Modal from './Modal';
import { formatDate } from '../utils/dateUtils';
import { Download } from 'lucide-react';

interface SubmissionGradingProps {
  submission: Submission;
  assignment: Assignment;
  isTeacher?: boolean;
}

const SubmissionGrading: React.FC<SubmissionGradingProps> = ({ submission, assignment, isTeacher = false }) => {
  const { addToast } = useToast();
  const [isGradingOpen, setIsGradingOpen] = useState(false);
  const [grade, setGrade] = useState(submission.grade?.toString() || '');
  const [feedback, setFeedback] = useState(submission.feedback || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitGrade = async () => {
    if (!grade) {
      addToast('Please enter a grade', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      addToast('Grade submitted successfully!', 'success');
      setIsGradingOpen(false);
    } catch (error) {
      addToast('Error submitting grade', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
      <div style={{ marginBottom: '15px' }}>
        <h3 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
          Submission Details
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          <strong>Submitted by:</strong> {submission.studentName}
        </p>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          <strong>Submitted on:</strong> {formatDate(submission.submittedAt)}
        </p>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '15px' }}>
          <strong>File:</strong> {submission.fileName}
        </p>

        <a
          href={submission.fileUrl}
          download
          className="btn btn-secondary"
          style={{ marginBottom: '15px' }}
        >
          <Download size={16} />
          Download File
        </a>
      </div>

      {isTeacher && (
        <div>
          {submission.status === 'graded' ? (
            <div style={{ padding: '15px', backgroundColor: 'var(--neutral-100)', borderRadius: '6px', marginBottom: '15px' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>
                Grade: {submission.grade}/{assignment.maxScore}
              </p>
              {submission.feedback && (
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Feedback: {submission.feedback}
                </p>
              )}
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => setIsGradingOpen(true)}>
              Grade Submission
            </button>
          )}
        </div>
      )}

      <Modal
        isOpen={isGradingOpen}
        onClose={() => setIsGradingOpen(false)}
        title="Grade Submission"
        footer={
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={() => setIsGradingOpen(false)} disabled={isLoading}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmitGrade} disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Grade'}
            </button>
          </div>
        }
      >
        {isLoading && <LoadingSpinner label="Submitting grade..." />}
        {!isLoading && (
          <div>
            <div className="input-group">
              <label>Grade ({assignment.maxScore} points)</label>
              <input
                type="number"
                min="0"
                max={assignment.maxScore}
                value={grade}
                onChange={e => setGrade(e.target.value)}
                placeholder={`Enter grade (0-${assignment.maxScore})`}
              />
            </div>
            <div className="input-group">
              <label>Feedback</label>
              <textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Provide feedback to the student..." />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SubmissionGrading;
