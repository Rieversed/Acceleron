import { useState } from 'react'
import './App.css'

function App() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [appConfig, setAppConfig] = useState({
    appName: 'TestApp',
    parameters: {
      memory: true,
      cpu: true,
      network: false,
      storage: false
    }
  });

  const callOptimizeApi = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appConfig),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error calling optimize API:', error);
      setResult({ error: 'Failed to connect to optimization service' });
    } finally {
      setLoading(false);
    }
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    
    if (name === 'appName') {
      setAppConfig(prev => ({
        ...prev,
        appName: value
      }));
    } else {
      setAppConfig(prev => ({
        ...prev,
        parameters: {
          ...prev.parameters,
          [name]: checked
        }
      }));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Acceleron - App Optimizer</h1>
        <p>Optimize your applications for better performance</p>
      </header>
      
      <main>
        <div className="config-section">
          <h2>Configuration</h2>
          
          <div className="form-group">
            <label htmlFor="appName">App Name:</label>
            <input 
              type="text" 
              id="appName" 
              name="appName" 
              value={appConfig.appName}
              onChange={handleConfigChange}
            />
          </div>
          
          <div className="parameters">
            <h3>Optimization Parameters:</h3>
            
            <div className="checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  name="memory" 
                  checked={appConfig.parameters.memory}
                  onChange={handleConfigChange}
                />
                Memory Usage
              </label>
            </div>
            
            <div className="checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  name="cpu" 
                  checked={appConfig.parameters.cpu}
                  onChange={handleConfigChange}
                />
                CPU Performance
              </label>
            </div>
            
            <div className="checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  name="network" 
                  checked={appConfig.parameters.network}
                  onChange={handleConfigChange}
                />
                Network Optimization
              </label>
            </div>
            
            <div className="checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  name="storage" 
                  checked={appConfig.parameters.storage}
                  onChange={handleConfigChange}
                />
                Storage Efficiency
              </label>
            </div>
          </div>
          
          <button 
            onClick={callOptimizeApi} 
            disabled={loading}
            className="optimize-button"
          >
            {loading ? 'Optimizing...' : 'Optimize App'}
          </button>
        </div>
        
        {result && (
          <div className="result-section">
            <h2>Optimization Result:</h2>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
