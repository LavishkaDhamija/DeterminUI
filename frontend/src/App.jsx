import { useState } from 'react';
import { generatePlan, explainPlan } from './api/uiService.js';
import { SchemaRenderer } from './renderer/SchemaRenderer.jsx'; // Import the renderer
import './App.css';

function App() {
  const [intent, setIntent] = useState('');
  const [plan, setPlan] = useState(null);
  const [explanation, setExplanation] = useState('');

  // Refined Loading States
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(''); // Text status

  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!intent.trim()) return;

    setLoading(true);
    setError(null);
    setPlan(null);
    setExplanation('');
    setStatusMessage('Initializing Planner...');

    try {
      // 1. Generate UI Plan
      setStatusMessage('Step 1/3: AI Planner generating layout...');
      const generatedPlan = await generatePlan(intent);

      setStatusMessage('Step 2/3: Validating deterministic schema...');
      // Validation happens on backend, but we simulate the feedback step here for UX
      setPlan(generatedPlan);

      // 2. Explain UI Plan
      setStatusMessage('Step 3/3: Explainer Agent analyzing decisions...');
      const explanationRes = await explainPlan(intent, generatedPlan);

      setExplanation(explanationRes.explanation);
      setStatusMessage(''); // Done

    } catch (err) {
      console.error(err);
      setError(err.message);
      setStatusMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>DeterminUI Generator</h1>
      </header>

      <main className="app-main">
        {/* Input Section */}
        <section className="input-section">
          <textarea
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            placeholder="Describe the UI you want (e.g., 'A login card with email and password')"
            rows={4}
            className="intent-input"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !intent.trim()}
            className="generate-btn"
          >
            {loading ? 'Processing...' : 'Generate UI'}
          </button>

          {/* Status Indicator */}
          {loading && (
            <div className="status-indicator">
              <span className="sc-spinner">⟳</span> {statusMessage}
            </div>
          )}

          {error && <div className="error-message">Error: {error}</div>}
        </section>

        {/* Output Section */}
        <div className="output-container">

          {/* Renderer Placeholder */}
          <div className="renderer-pane">
            <h2>Live Preview</h2>
            {plan ? (
              <div className="preview-box">
                <SchemaRenderer schema={plan} />
              </div>
            ) : (
              <div className="empty-state">Enter a prompt to generate UI</div>
            )}
          </div>

          {/* Explanation Placeholder */}
          <div className="explanation-pane">
            <h2>AI Reasoning</h2>
            {loading && !explanation ? (
              <p className="loading-text">Waiting for plan...</p>
            ) : explanation ? (
              <p className="explanation-text">{explanation}</p>
            ) : (
              <p className="empty-text">Explanation will appear here.</p>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
