import React from 'react';
import './Button.css';
import Icon from './Icon';
import type { IconType } from './Icon';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  ...rest
}) => {
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full-width' : '',
    icon ? 'btn-with-icon' : '',
    icon && iconPosition === 'right' ? 'btn-icon-right' : '',
    className
  ].filter(Boolean).join(' ');

  const iconSize = size === 'small' ? 16 : size === 'medium' ? 20 : 24;

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {icon && iconPosition === 'left' && (
        <span className="btn-icon">
          <Icon type={icon} size={iconSize} />
        </span>
      )}
      <span className="btn-text">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="btn-icon">
          <Icon type={icon} size={iconSize} />
        </span>
      )}
      <span className="btn-background"></span>
    </button>
  );
};

export default Button;
