import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="theme-toggle">
      <input
        type="checkbox"
        id="theme-toggle"
        className="theme-toggle-checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <label htmlFor="theme-toggle" className="theme-toggle-label">
        <span className="theme-toggle-inner"></span>
        <span className="theme-toggle-switch"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
