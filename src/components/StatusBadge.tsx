import React from 'react';

interface StatusBadgeProps {
  status: 'pending' | 'submitted' | 'graded';
}

const statusLabelMap = {
  pending: 'Pending',
  submitted: 'Submitted',
  graded: 'Graded',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return <span className={`badge badge-${status}`}>{statusLabelMap[status]}</span>;
};

export default StatusBadge;
