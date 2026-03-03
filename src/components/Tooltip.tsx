import React, { useState, ReactNode, useRef, useEffect } from 'react';
import './Tooltip.css';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number>();

  const show = () => {
    // short delay to avoid flicker
    timeoutRef.current = window.setTimeout(() => setVisible(true), 100);
  };
  const hide = () => {
    clearTimeout(timeoutRef.current);
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
