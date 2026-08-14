'use client';

import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost' | 'outline' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
};

const variants: Record<string, string> = {
  primary: 'btn btn-teal',
  teal:    'btn btn-teal',
  secondary: 'btn btn-ghost-teal',
  dark:    'btn btn-dark',
  outline: 'btn btn-outline',
  ghost:   'btn btn-ghost-white',
};

const sizes: Record<string, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
}: ButtonProps) {
  const classes = [variants[variant], sizes[size], className].filter(Boolean).join(' ');

  if (href) {
    return <a className={classes} href={href}>{children}</a>;
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
