import React from 'react';

/**
 * 🔹 F2 - Intent Panel
 * 
 * Clean, minimal interface for user input.
 * No chat history, just focus on the task.
 */
export const IntentPanel = ({
    intent,
    setIntent,
    handleGenerate,
    loading,
    statusMessage,
    error
}) => {
    return (
        <div className="intent-panel">
            <div className="panel-header">
                <h2>🛠️ Intent</h2>
                <span className="badge">v1.0</span>
            </div>

            <div className="form-group">
                <label>Describe your UI component</label>
                <textarea
                    value={intent}
                    onChange={(e) => setIntent(e.target.value)}
                    placeholder="e.g. A login card with email & password inputs..."
                    rows={6}
                    disabled={loading}
                />
            </div>

            <div className="actions">
                <button
                    className={`generate-btn ${loading ? 'loading' : ''}`}
                    onClick={handleGenerate}
                    disabled={loading || !intent.trim()}
                >
                    {loading ? 'Generating...' : 'Generate UI'}
                </button>
            </div>

            {/* System Status Log */}
            <div className="system-log">
                <div className="log-header">System Status</div>
                <div className="log-content">
                    {loading ? (
                        <div className="log-item active">
                            <span className="dot pulse"></span> {statusMessage}
                        </div>
                    ) : error ? (
                        <div className="log-item error">❌ {error}</div>
                    ) : (
                        <div className="log-item idle">🟢 Ready</div>
                    )}
                </div>
            </div>
        </div>
    );
};
