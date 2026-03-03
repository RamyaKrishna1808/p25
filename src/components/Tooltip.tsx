import React, { useState, useRef } from 'react';
import type { ReactNode } from 'react';
import './Tooltip.css';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const show = () => {
    timeoutRef.current = window.setTimeout(() => {
      setVisible(true);
    }, 100);
  };

  const hide = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(false);
  };

  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && <span className="tooltip-box">{text}</span>}
    </span>
  );
};

export default Tooltip;