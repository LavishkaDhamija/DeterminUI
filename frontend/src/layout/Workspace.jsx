import React, { useState } from 'react';
import './Workspace.css';

/**
 * 🔹 F1 - Workspace Layout (Shell)
 * 
 * Provides a 3-panel layout:
 * 1. AI Chat / Intent Panel (Left)
 * 2. Editor / Code Panel (Middle) - Can be toggled
 * 3. Preview Panel (Right)
 */
export const Workspace = ({
    intent,
    setIntent,
    generate,
    loading,
    plan,
    explanation,
    children
}) => {
    const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'code' | 'json'

    return (
        <div className="workspace">

            {/* 1. Left Panel: AI Chat / Intent */}
            <aside className="panel left-panel">
                <div className="panel-header">
                    <h2>DeterminUI</h2>
                    <span className="badge">AI Agent</span>
                </div>

                <div className="chat-interface">
                    {/* Scrollable Chat History (Future Enhancement) */}
                    <div className="chat-history">
                        <div className="system-msg">
                            Welcome! Describe the UI component you need.
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="input-area">
                        <textarea
                            value={intent}
                            onChange={(e) => setIntent(e.target.value)}
                            placeholder="e.g. A login card with email & password..."
                            disabled={loading}
                        />
                        <button onClick={generate} disabled={loading || !intent.trim()}>
                            {loading ? 'Thinking...' : 'Generate ⏎'}
                        </button>
                    </div>
                </div>

                {/* Explanation Section */}
                {explanation && (
                    <div className="explanation-box fade-in">
                        <h3>💡 AI Reasoning</h3>
                        <p>{explanation}</p>
                    </div>
                )}
            </aside>

            {/* 2. Middle/Right Panel: Content Area */}
            <main className="panel content-panel">
                <div className="panel-header tabs">
                    <button
                        className={activeTab === 'preview' ? 'active' : ''}
                        onClick={() => setActiveTab('preview')}
                    >
                        Live Preview
                    </button>
                    <button
                        className={activeTab === 'code' ? 'active' : ''}
                        onClick={() => setActiveTab('code')}
                    >
                        React Code
                    </button>
                    <button
                        className={activeTab === 'json' ? 'active' : ''}
                        onClick={() => setActiveTab('json')}
                    >
                        JSON Schema
                    </button>
                </div>

                <div className="stage">
                    {activeTab === 'preview' && (
                        <div className="preview-canvas">
                            {children}
                        </div>
                    )}

                    {activeTab === 'code' && (
                        <div className="code-editor">
                            {/* Placeholder for code view - will implement logic later or receive as prop */}
                            <pre className="code-block">
                                {`// React Code will appear here\n// Waiting for generation...`}
                            </pre>
                        </div>
                    )}

                    {activeTab === 'json' && (
                        <div className="json-viewer">
                            <pre>{JSON.stringify(plan, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};
