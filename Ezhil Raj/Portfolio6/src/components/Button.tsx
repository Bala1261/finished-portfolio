import React from 'react';
import './Button.css';

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  ariaLabel?: string;
}

export type ButtonAsButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
    download?: undefined;
  };

export type ButtonAsLinkProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
    isExternal?: boolean;
    download?: string | boolean;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'right',
    className = '',
    ariaLabel,
    href,
    ...rest
  } = props;

  const buttonClasses = `bexo-btn bexo-btn--${variant} bexo-btn--${size} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="bexo-btn-icon left">{icon}</span>}
      <span className="bexo-btn-label">{children}</span>
      {icon && iconPosition === 'right' && <span className="bexo-btn-icon right">{icon}</span>}
    </>
  );

  if (href) {
    const isExternal = 'isExternal' in props ? props.isExternal : !href.startsWith('#');
    const download = 'download' in props ? props.download : undefined;

    return (
      <a
        href={href}
        className={buttonClasses}
        aria-label={ariaLabel}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        download={download}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={buttonClasses}
      aria-label={ariaLabel}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};
