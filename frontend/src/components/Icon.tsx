import React from 'react';

// Import all SVG icons
import searchIcon from '../assets/icons/search.svg';
import lightningIcon from '../assets/icons/lightning.svg';
import checkIcon from '../assets/icons/check.svg';
import errorIcon from '../assets/icons/error.svg';
import browserIcon from '../assets/icons/browser.svg';
import productivityIcon from '../assets/icons/productivity.svg';
import gamingIcon from '../assets/icons/gaming.svg';
import mediaIcon from '../assets/icons/media.svg';
import socialIcon from '../assets/icons/social.svg';
import systemIcon from '../assets/icons/system.svg';

// Define icon types
export type IconType = 
  | 'search'
  | 'lightning'
  | 'check'
  | 'error'
  | 'browser'
  | 'productivity'
  | 'gaming'
  | 'media'
  | 'social'
  | 'system';

interface IconProps {
  type: IconType;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ 
  type, 
  size = 24, 
  color = 'currentColor',
  className = ''
}) => {
  const iconStyle = {
    width: `${size}px`,
    height: `${size}px`,
    color,
  };

  const getIcon = () => {
    switch (type) {
      case 'search':
        return <img src={searchIcon} style={iconStyle} className={className} alt="Search" />;
      case 'lightning':
        return <img src={lightningIcon} style={iconStyle} className={className} alt="Lightning" />;
      case 'check':
        return <img src={checkIcon} style={iconStyle} className={className} alt="Check" />;
      case 'error':
        return <img src={errorIcon} style={iconStyle} className={className} alt="Error" />;
      case 'browser':
        return <img src={browserIcon} style={iconStyle} className={className} alt="Browser" />;
      case 'productivity':
        return <img src={productivityIcon} style={iconStyle} className={className} alt="Productivity" />;
      case 'gaming':
        return <img src={gamingIcon} style={iconStyle} className={className} alt="Gaming" />;
      case 'media':
        return <img src={mediaIcon} style={iconStyle} className={className} alt="Media" />;
      case 'social':
        return <img src={socialIcon} style={iconStyle} className={className} alt="Social" />;
      case 'system':
        return <img src={systemIcon} style={iconStyle} className={className} alt="System" />;
      default:
        return null;
    }
  };

  return getIcon();
};

export default Icon;
