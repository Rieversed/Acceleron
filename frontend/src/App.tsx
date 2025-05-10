import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from './theme/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import SearchBar from './components/SearchBar';
import Card from './components/Card';
import Button from './components/Button';
import Icon from './components/Icon';
import type { IconType } from './components/Icon';
import TitleBar from './components/TitleBar';
import './theme/theme.css';

// Define app types
interface App {
  id: string;
  name: string;
  description: string;
  category: 'browser' | 'productivity' | 'gaming' | 'media' | 'social' | 'system';
  icon: IconType;
  scripts: OptimizationScript[];
}

interface OptimizationScript {
  id: string;
  name: string;
  description: string;
  type: 'debloat' | 'performance' | 'privacy';
}

// Mock data for apps
const mockApps: App[] = [
  {
    id: 'chrome',
    name: 'Google Chrome',
    description: 'Popular web browser with extensive extension support',
    category: 'browser',
    icon: 'browser',
    scripts: [
      {
        id: 'chrome-debloat',
        name: 'Debloat Chrome',
        description: 'Remove unnecessary components and features',
        type: 'debloat'
      },
      {
        id: 'chrome-performance',
        name: 'Optimize Performance',
        description: 'Improve startup time and resource usage',
        type: 'performance'
      },
      {
        id: 'chrome-privacy',
        name: 'Enhance Privacy',
        description: 'Disable tracking and telemetry features',
        type: 'privacy'
      }
    ]
  },
  {
    id: 'firefox',
    name: 'Mozilla Firefox',
    description: 'Privacy-focused web browser with customization options',
    category: 'browser',
    icon: 'browser',
    scripts: [
      {
        id: 'firefox-debloat',
        name: 'Debloat Firefox',
        description: 'Remove unnecessary components and features',
        type: 'debloat'
      },
      {
        id: 'firefox-performance',
        name: 'Optimize Performance',
        description: 'Improve startup time and resource usage',
        type: 'performance'
      }
    ]
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: 'Lightweight code editor with extensive plugin support',
    category: 'productivity',
    icon: 'productivity',
    scripts: [
      {
        id: 'vscode-debloat',
        name: 'Debloat VS Code',
        description: 'Remove unnecessary components and features',
        type: 'debloat'
      },
      {
        id: 'vscode-performance',
        name: 'Optimize Performance',
        description: 'Improve startup time and resource usage',
        type: 'performance'
      }
    ]
  },
  {
    id: 'steam',
    name: 'Steam',
    description: 'Digital distribution platform for PC gaming',
    category: 'gaming',
    icon: 'gaming',
    scripts: [
      {
        id: 'steam-debloat',
        name: 'Debloat Steam',
        description: 'Remove unnecessary components and features',
        type: 'debloat'
      },
      {
        id: 'steam-performance',
        name: 'Optimize Performance',
        description: 'Improve startup time and resource usage',
        type: 'performance'
      }
    ]
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Music streaming service with a vast library',
    category: 'media',
    icon: 'media',
    scripts: [
      {
        id: 'spotify-debloat',
        name: 'Debloat Spotify',
        description: 'Remove unnecessary components and features',
        type: 'debloat'
      },
      {
        id: 'spotify-performance',
        name: 'Optimize Performance',
        description: 'Improve startup time and resource usage',
        type: 'performance'
      }
    ]
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Voice, video and text communication service',
    category: 'social',
    icon: 'social',
    scripts: [
      {
        id: 'discord-debloat',
        name: 'Debloat Discord',
        description: 'Remove unnecessary components and features',
        type: 'debloat'
      },
      {
        id: 'discord-performance',
        name: 'Optimize Performance',
        description: 'Improve startup time and resource usage',
        type: 'performance'
      },
      {
        id: 'discord-privacy',
        name: 'Enhance Privacy',
        description: 'Disable tracking and telemetry features',
        type: 'privacy'
      }
    ]
  },
  {
    id: 'windows',
    name: 'Windows',
    description: 'Operating system with system-wide optimizations',
    category: 'system',
    icon: 'system',
    scripts: [
      {
        id: 'windows-debloat',
        name: 'Debloat Windows',
        description: 'Remove unnecessary components and features',
        type: 'debloat'
      },
      {
        id: 'windows-performance',
        name: 'Optimize Performance',
        description: 'Improve startup time and resource usage',
        type: 'performance'
      },
      {
        id: 'windows-privacy',
        name: 'Enhance Privacy',
        description: 'Disable tracking and telemetry features',
        type: 'privacy'
      }
    ]
  }
];

const AppContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [selectedScripts, setSelectedScripts] = useState<string[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [filteredApps, setFilteredApps] = useState<App[]>(mockApps);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Filter apps based on search query and category
  useEffect(() => {
    let filtered = mockApps;
    
    if (searchQuery) {
      filtered = filtered.filter((app: App) => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeCategory && activeCategory !== 'all') {
      filtered = filtered.filter((app: App) => app.category === activeCategory);
    }
    
    setFilteredApps(filtered);
  }, [searchQuery, activeCategory]);

  // Handle app selection
  const handleAppSelect = (app: App) => {
    setSelectedApp(app);
    setSelectedScripts([]);
    setOptimizationComplete(false);
  };

  // Handle script selection
  const handleScriptSelect = (scriptId: string) => {
    setSelectedScripts(prev => {
      if (prev.includes(scriptId)) {
        return prev.filter(id => id !== scriptId);
      } else {
        return [...prev, scriptId];
      }
    });
  };

  // Handle optimization
  const handleOptimize = async () => {
    if (!selectedApp || selectedScripts.length === 0) return;
    
    setIsOptimizing(true);
    
    // Simulate API call
    try {
      // In a real app, this would be an API call to the backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      setOptimizationComplete(true);
    } catch (error) {
      console.error('Optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  // Reset selection
  const handleReset = () => {
    setSelectedApp(null);
    setSelectedScripts([]);
    setOptimizationComplete(false);
  };

  // Get all unique categories
  const categories = ['all', ...Array.from(new Set(mockApps.map((app: App) => app.category)))];

  return (
    <div className="app">
      <TitleBar />
      <div className="app-content">
        <header className="app-header">
          <div className="app-logo">
            <Icon type="lightning" size={32} />
            <h1>Acceleron</h1>
          </div>
          <div className="app-actions">
            <Button 
              variant="outline" 
              icon="cog"
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            >
              Advanced
            </Button>
            <ThemeToggle />
          </div>
        </header>
        
        <main className="app-main">
          {!selectedApp ? (
            <>
              <section className="app-hero">
                <h2 className="app-title">Optimize Your Applications</h2>
                <p className="app-subtitle">
                  Select an application to optimize its performance and remove unnecessary components.
                </p>
                <SearchBar 
                  placeholder="Search applications..." 
                  onSearch={setSearchQuery}
                  autoFocus
                />
              </section>
              
              <section className="app-categories">
                <div className="category-filters">
                  {categories.map((category: string) => (
                    <Button 
                      key={category}
                      variant={activeCategory === category ? 'primary' : 'outline'}
                      size="small"
                      onClick={() => setActiveCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </section>
              
              <section className="app-grid">
                {filteredApps.length > 0 ? (
                  <div className="card-grid">
                    {filteredApps.map((app: App) => (
                      <Card
                        key={app.id}
                        title={app.name}
                        description={app.description}
                        icon={app.icon}
                        onClick={() => handleAppSelect(app)}
                        className="card-animate-in"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <Icon type="error" size={48} />
                    <p>No applications found matching your search criteria.</p>
                  </div>
                )}
              </section>
            </>
          ) : (
            <section className="app-detail">
              <div className="app-detail-header">
                <Button 
                  variant="text" 
                  icon="browser" 
                  onClick={handleReset}
                >
                  Back to Applications
                </Button>
                <h2>{selectedApp.name}</h2>
                <p>{selectedApp.description}</p>
              </div>
              
              <div className="app-scripts">
                <h3>Available Optimization Scripts</h3>
                <div className="script-list">
                  {selectedApp.scripts.map(script => (
                    <Card
                      key={script.id}
                      title={script.name}
                      description={script.description}
                      selected={selectedScripts.includes(script.id)}
                      onClick={() => handleScriptSelect(script.id)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="app-actions-container">
                <Button 
                  variant="primary" 
                  icon="lightning"
                  disabled={selectedScripts.length === 0 || isOptimizing}
                  onClick={handleOptimize}
                >
                  {isOptimizing ? 'Optimizing...' : 'Run Optimization'}
                </Button>
              </div>
              
              {optimizationComplete && (
                <div className="optimization-result">
                  <Icon type="check" size={32} />
                  <h3>Optimization Complete!</h3>
                  <p>All selected optimizations have been applied successfully.</p>
                </div>
              )}
            </section>
          )}
        </main>
        
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Acceleron. All rights reserved.</p>
          <p className="disclaimer">By using this software, you acknowledge that any changes made to your system are at your own risk.</p>
        </footer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
