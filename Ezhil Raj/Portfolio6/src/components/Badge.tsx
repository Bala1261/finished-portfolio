import React from 'react';
import './Badge.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'accent' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  dot = false,
  className = '',
}) => {
  return (
    <span className={`bexo-badge bexo-badge--${variant} bexo-badge--${size} ${className}`.trim()}>
      {dot && <span className="bexo-badge-dot" aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
};
