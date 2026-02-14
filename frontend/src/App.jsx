import { useState } from 'react';
import { generatePlan, explainPlan } from './api/uiService.js';
import { SchemaRenderer } from './renderer/SchemaRenderer.jsx'; // Import the renderer
import './App.css';

function App() {
  const [intent, setIntent] = useState('');
  const [plan, setPlan] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [explaining, setExplaining] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!intent.trim()) return;

    setLoading(true);
    setError(null);
    setPlan(null);
    setExplanation('');

    try {
      // 1. Generate UI Plan
      const generatedPlan = await generatePlan(intent);
      setPlan(generatedPlan);

      // 2. Explain UI Plan (Parallel or Sequential - let's do sequential for clarity)
      setExplaining(true);
      const explanationRes = await explainPlan(intent, generatedPlan);
      setExplanation(explanationRes.explanation);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
      setExplaining(false);
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
            {loading ? 'Generating...' : 'Generate UI'}
          </button>

          {error && <div className="error-message">Error: {error}</div>}
        </section>

        {/* Output Section */}
        <div className="output-container">

          {/* Renderer Placeholder */}
          <div className="renderer-pane">
            <h2>Live Preview</h2>
            {plan ? (
              <div className="preview-box">
                {/* 🧩 Step F3 - Use SchemaRenderer */}
                <SchemaRenderer schema={plan} />
              </div>
            ) : (
              <div className="empty-state">Enter a prompt to generate UI</div>
            )}
          </div>

          {/* Explanation Placeholder */}
          <div className="explanation-pane">
            <h2>AI Reasoning</h2>
            {explaining ? (
              <p className="loading-text">Analyzing UX decisions...</p>
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
