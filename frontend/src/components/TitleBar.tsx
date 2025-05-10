import React from 'react';
import './TitleBar.css';

// Add TypeScript declaration for Tauri global object
declare global {
  interface Window {
    __TAURI__?: {
      window: {
        appWindow: {
          close: () => void;
          minimize: () => void;
          maximize: () => void;
          unmaximize: () => void;
          isMaximized: () => Promise<boolean>;
        };
      };
    };
  }
}

const TitleBar: React.FC = () => {
  const handleClose = () => {
    // Using the window API via the window.__TAURI__ object
    if (window.__TAURI__) {
      window.__TAURI__.window.appWindow.close();
    }
  };

  const handleMinimize = () => {
    if (window.__TAURI__) {
      window.__TAURI__.window.appWindow.minimize();
    }
  };

  const handleToggleMaximize = async () => {
    if (window.__TAURI__) {
      const isMaximized = await window.__TAURI__.window.appWindow.isMaximized();
      if (isMaximized) {
        window.__TAURI__.window.appWindow.unmaximize();
      } else {
        window.__TAURI__.window.appWindow.maximize();
      }
    }
  };

  return (
    <div className="titlebar">
      <div className="titlebar-spacer"></div>
      <div className="titlebar-title">Acceleron</div>
      <div className="titlebar-controls">
        <div className="titlebar-button minimize" onClick={handleMinimize}></div>
        <div className="titlebar-button maximize" onClick={handleToggleMaximize}></div>
        <div className="titlebar-button close" onClick={handleClose}></div>
      </div>
    </div>
  );
};

export default TitleBar;
