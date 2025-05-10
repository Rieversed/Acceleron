import React from 'react';
import './Card.css';
import Icon from './Icon';
import type { IconType } from './Icon';

interface CardProps {
  title: string;
  description?: string;
  icon?: IconType;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  onClick,
  selected = false,
  className = '',
  children
}) => {
  const cardClasses = [
    'card',
    selected ? 'card-selected' : '',
    onClick ? 'card-clickable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
    >
      {icon && (
        <div className="card-icon">
          <Icon type={icon} size={32} />
        </div>
      )}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {description && <p className="card-description">{description}</p>}
        {children && <div className="card-children">{children}</div>}
      </div>
      {selected && (
        <div className="card-selected-indicator">
          <Icon type="check" size={20} />
        </div>
      )}
    </div>
  );
};

export default Card;
