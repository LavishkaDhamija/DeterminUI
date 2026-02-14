import { useState } from 'react';
import { generatePlan, explainPlan, generateCode } from './api/uiService.js';
import { Workspace } from './layout/Workspace.jsx';
import { PreviewPanel } from './panels/PreviewPanel.jsx';
import { CodePanel } from './panels/CodePanel.jsx';
import './App.css';

function App() {
  const [intent, setIntent] = useState('');
  const [plan, setPlan] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [generatedCodeStr, setGeneratedCodeStr] = useState('');

  // Refined Loading States
  const [loading, setLoading] = useState(false);
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

      // Validation happens on backend
      setPlan(generatedPlan);

      // 2. Fetch React Code (Wait for this before finishing)
      try {
        const codeRes = await generateCode(generatedPlan);
        setGeneratedCodeStr(codeRes);
      } catch (codeErr) {
        console.warn("Code generation failed", codeErr);
        setGeneratedCodeStr("// Failed to generate code. Displaying schema instead.");
      }

      // 3. Explain UI Plan
      const explanationRes = await explainPlan(intent, generatedPlan);
      setExplanation(explanationRes.explanation);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Workspace
      intent={intent}
      setIntent={setIntent}
      generate={handleGenerate}
      loading={loading}
      plan={plan}
      explanation={explanation}
      // Pass the panels as props to match Workspace API
      previewPanel={<PreviewPanel plan={plan} loading={loading} />}
      codePanel={<CodePanel code={generatedCodeStr} />}
    />
  );
}

export default App;
