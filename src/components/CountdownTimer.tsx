import React, { useState, useEffect } from 'react';
import { getTimeRemaining, isOverdue } from '../utils/dateUtils';

interface CountdownTimerProps {
  dueDate: Date | string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ dueDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(() => getTimeRemaining(dueDate));

  useEffect(() => {
    const updateTimer = () => {
      setTimeRemaining(getTimeRemaining(dueDate));
    };

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [dueDate]);

  if (timeRemaining.isOverdue || isOverdue(dueDate)) {
    return <span className="timer timer-danger">⏰ Overdue</span>;
  }

  const isDangerous = timeRemaining.days === 0 && (timeRemaining.hours < 24);
  const timerClass = isDangerous ? 'timer-danger' : 'timer-safe';

  return (
    <span className={`timer ${timerClass}`}>
      ⏱️ {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
    </span>
  );
};

export default CountdownTimer;
