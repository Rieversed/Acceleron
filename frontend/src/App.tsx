import { useState, useRef } from 'react'
import './App.css'

// Define app types
interface AppCategory {
  id: string;
  name: string;
  icon: string;
}

interface OptimizationScript {
  id: string;
  name: string;
  description: string;
  recommended: boolean;
}

interface App {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  scripts: OptimizationScript[];
  popularity: number; // 1-10 rating
}

// Sample data for apps
const appCategories: AppCategory[] = [
  { id: 'browsers', name: 'Web Browsers', icon: '🌐' },
  { id: 'productivity', name: 'Productivity', icon: '📊' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'media', name: 'Media & Entertainment', icon: '🎬' },
  { id: 'social', name: 'Social & Communication', icon: '💬' },
  { id: 'system', name: 'System Utilities', icon: '⚙️' },
];

const sampleApps: App[] = [
  {
    id: 'chrome',
    name: 'Google Chrome',
    icon: '🌐',
    description: 'Popular web browser with extensive features',
    category: 'browsers',
    popularity: 9,
    scripts: [
      {
        id: 'chrome-memory',
        name: 'Memory Optimization',
        description: 'Reduce Chrome\'s memory footprint by disabling unused features',
        recommended: true
      },
      {
        id: 'chrome-startup',
        name: 'Startup Boost',
        description: 'Optimize Chrome\'s startup time by removing unnecessary extensions',
        recommended: true
      },
      {
        id: 'chrome-privacy',
        name: 'Privacy Enhancement',
        description: 'Disable tracking and telemetry features',
        recommended: false
      }
    ]
  },
  {
    id: 'firefox',
    name: 'Mozilla Firefox',
    icon: '🦊',
    description: 'Privacy-focused web browser',
    category: 'browsers',
    popularity: 8,
    scripts: [
      {
        id: 'firefox-memory',
        name: 'Memory Optimization',
        description: 'Reduce Firefox\'s memory usage',
        recommended: true
      },
      {
        id: 'firefox-privacy',
        name: 'Privacy Hardening',
        description: 'Enhance Firefox\'s privacy features',
        recommended: true
      }
    ]
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    icon: '📝',
    description: 'Lightweight code editor with extensive plugin support',
    category: 'productivity',
    popularity: 10,
    scripts: [
      {
        id: 'vscode-startup',
        name: 'Startup Optimization',
        description: 'Improve VSCode startup time',
        recommended: true
      },
      {
        id: 'vscode-extensions',
        name: 'Extension Management',
        description: 'Optimize extension loading and usage',
        recommended: false
      }
    ]
  },
  {
    id: 'steam',
    name: 'Steam',
    icon: '🎮',
    description: 'Popular gaming platform and store',
    category: 'gaming',
    popularity: 9,
    scripts: [
      {
        id: 'steam-cleanup',
        name: 'Cache Cleanup',
        description: 'Remove unnecessary cache files and downloads',
        recommended: true
      },
      {
        id: 'steam-startup',
        name: 'Disable Auto-start',
        description: 'Prevent Steam from starting with Windows',
        recommended: false
      }
    ]
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: '🎵',
    description: 'Music streaming service',
    category: 'media',
    popularity: 8,
    scripts: [
      {
        id: 'spotify-cache',
        name: 'Cache Management',
        description: 'Optimize Spotify\'s cache usage',
        recommended: true
      },
      {
        id: 'spotify-startup',
        name: 'Startup Optimization',
        description: 'Improve Spotify\'s launch time',
        recommended: false
      }
    ]
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: '💬',
    description: 'Voice, video and text communication platform',
    category: 'social',
    popularity: 9,
    scripts: [
      {
        id: 'discord-memory',
        name: 'Memory Usage Reduction',
        description: 'Reduce Discord\'s memory footprint',
        recommended: true
      },
      {
        id: 'discord-startup',
        name: 'Disable Auto-start',
        description: 'Prevent Discord from starting with Windows',
        recommended: false
      }
    ]
  },
  {
    id: 'windows',
    name: 'Windows System',
    icon: '⊞',
    description: 'Core Windows system optimization',
    category: 'system',
    popularity: 10,
    scripts: [
      {
        id: 'windows-debloat',
        name: 'Windows Debloater',
        description: 'Remove unnecessary Windows components and services',
        recommended: true
      },
      {
        id: 'windows-privacy',
        name: 'Privacy Enhancement',
        description: 'Disable telemetry and data collection',
        recommended: true
      },
      {
        id: 'windows-startup',
        name: 'Startup Optimization',
        description: 'Improve Windows boot time',
        recommended: true
      }
    ]
  },
  {
    id: 'adobe',
    name: 'Adobe Creative Cloud',
    icon: '🎨',
    description: 'Suite of creative applications',
    category: 'productivity',
    popularity: 7,
    scripts: [
      {
        id: 'adobe-services',
        name: 'Background Services',
        description: 'Disable unnecessary Adobe background services',
        recommended: true
      },
      {
        id: 'adobe-cleanup',
        name: 'Cache Cleanup',
        description: 'Clean up Adobe cache files',
        recommended: false
      }
    ]
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [selectedScripts, setSelectedScripts] = useState<string[]>([]);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const appListRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Filter apps based on search and category
  const filteredApps = sampleApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? app.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Handle app selection
  const handleAppSelect = (app: App) => {
    setSelectedApp(app);
    // Pre-select recommended scripts
    setSelectedScripts(app.scripts.filter(script => script.recommended).map(script => script.id));
    
    // Scroll to app details
    setTimeout(() => {
      if (appListRef.current) {
        appListRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Handle script selection toggle
  const toggleScript = (scriptId: string) => {
    setSelectedScripts(prev => 
      prev.includes(scriptId) 
        ? prev.filter(id => id !== scriptId) 
        : [...prev, scriptId]
    );
  };

  // Handle optimization
  const runOptimization = async () => {
    if (!selectedApp || selectedScripts.length === 0) return;
    
    setIsOptimizing(true);
    setOptimizationResult(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appId: selectedApp.id,
          scripts: selectedScripts,
        }),
      });
      
      const data = await response.json();
      setOptimizationResult(data);
      
      // Show success message with animation
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
      
      // Scroll to results
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error('Error optimizing app:', error);
      setOptimizationResult({ 
        success: false, 
        error: 'Failed to connect to optimization service' 
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  // Reset selection
  const handleReset = () => {
    setSelectedApp(null);
    setSelectedScripts([]);
    setOptimizationResult(null);
    setShowSuccessMessage(false);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="logo-container">
          <div className="logo">⚡</div>
          <h1>Acceleron</h1>
        </div>
        <p className="tagline">Optimize and debloat your applications</p>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Search and Filter Section */}
        <section className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="categories">
            <button 
              className={`category-button ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {appCategories.map(category => (
              <button
                key={category.id}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* App List */}
        <section className="apps-section">
          <h2>Applications {searchTerm && `matching "${searchTerm}"`}</h2>
          
          {filteredApps.length === 0 ? (
            <div className="no-results">
              <p>No applications found matching your criteria</p>
              <button className="reset-button" onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
              }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="app-grid">
              {filteredApps.map(app => (
                <div 
                  key={app.id} 
                  className={`app-card ${selectedApp?.id === app.id ? 'selected' : ''}`}
                  onClick={() => handleAppSelect(app)}
                >
                  <div className="app-icon">{app.icon}</div>
                  <div className="app-info">
                    <h3>{app.name}</h3>
                    <p>{app.description}</p>
                    <div className="app-meta">
                      <span className="app-category">
                        {appCategories.find(c => c.id === app.category)?.name}
                      </span>
                      <span className="app-popularity">
                        {'★'.repeat(Math.floor(app.popularity / 2))}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* App Details and Optimization */}
        {selectedApp && (
          <section className="app-details" ref={appListRef}>
            <div className="app-header">
              <div className="app-title">
                <div className="app-icon large">{selectedApp.icon}</div>
                <h2>{selectedApp.name}</h2>
              </div>
              <button className="back-button" onClick={handleReset}>
                ← Back to List
              </button>
            </div>

            <div className="optimization-options">
              <h3>Available Optimization Scripts</h3>
              <p className="help-text">
                Select the optimization scripts you want to run. Recommended scripts are pre-selected.
              </p>
              
              <div className="scripts-list">
                {selectedApp.scripts.map(script => (
                  <div key={script.id} className="script-item">
                    <label className="script-label">
                      <input
                        type="checkbox"
                        checked={selectedScripts.includes(script.id)}
                        onChange={() => toggleScript(script.id)}
                      />
                      <div className="script-info">
                        <span className="script-name">
                          {script.name}
                          {script.recommended && <span className="recommended-badge">Recommended</span>}
                        </span>
                        <span className="script-description">{script.description}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="action-buttons">
                <button 
                  className="optimize-button"
                  disabled={isOptimizing || selectedScripts.length === 0}
                  onClick={runOptimization}
                >
                  {isOptimizing ? (
                    <>
                      <span className="spinner"></span>
                      Optimizing...
                    </>
                  ) : (
                    <>Optimize {selectedApp.name}</>
                  )}
                </button>
                <button 
                  className="select-all-button"
                  onClick={() => setSelectedScripts(selectedApp.scripts.map(s => s.id))}
                >
                  Select All
                </button>
                <button 
                  className="clear-button"
                  onClick={() => setSelectedScripts([])}
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Optimization Results */}
            {optimizationResult && (
              <div className="optimization-results" ref={resultRef}>
                <h3>Optimization Results</h3>
                
                {optimizationResult.success ? (
                  <div className="success-result">
                    <div className="result-icon">✅</div>
                    <div className="result-details">
                      <h4>Successfully Optimized {selectedApp.name}</h4>
                      <ul className="improvements-list">
                        {optimizationResult.improvements?.map((improvement: string, index: number) => (
                          <li key={index}>{improvement}</li>
                        ))}
                      </ul>
                      <div className="stats-grid">
                        {optimizationResult.stats && Object.entries(optimizationResult.stats).map(([key, value]: [string, any]) => (
                          <div className="stat-item" key={key}>
                            <span className="stat-label">{key}</span>
                            <span className="stat-value">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="error-result">
                    <div className="result-icon">❌</div>
                    <div className="result-details">
                      <h4>Optimization Failed</h4>
                      <p>{optimizationResult.error || 'An unknown error occurred'}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Success Message Overlay */}
      <div className={`success-message ${showSuccessMessage ? 'show' : ''}`}>
        <div className="success-content">
          <span className="success-icon">✅</span>
          <span>Optimization completed successfully!</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>Acceleron &copy; {new Date().getFullYear()} - App Optimization Tool</p>
      </footer>
    </div>
  )
}

export default App
