import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Workspace.css';

/**
 * 🔹 F1 - Workspace Layout (Shell)
 * Now powered by Framer Motion for smooth transitions!
 */
export const Workspace = ({
    intent,
    setIntent,
    generate,
    loading,
    plan,
    explanation,
    previewPanel,
    codePanel,
    children
}) => {
    const [activeTab, setActiveTab] = useState('preview');

    // Animation variants
    const fadeVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    return (
        <div className="workspace">

            {/* 1. Left Panel */}
            <aside className="panel left-panel">
                <div className="panel-header">
                    <h2>DeterminUI</h2>
                    <span className="badge">AI Agent</span>
                </div>

                <div className="chat-interface">
                    <div className="chat-history">
                        <div className="system-msg">
                            Welcome! Describe the UI component you need.
                        </div>

                        <AnimatePresence>
                            {explanation && (
                                <motion.div
                                    className="explanation-msg"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                >
                                    <div className="msg-avatar">🤖</div>
                                    <div className="msg-bubble">
                                        <strong>AI Reasoning:</strong>
                                        <p>{explanation}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Input Area */}
                    <div className="input-area">
                        <textarea
                            value={intent}
                            onChange={(e) => setIntent(e.target.value)}
                            placeholder="e.g. A login card with email & password..."
                            disabled={loading}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    if (!loading && intent.trim()) generate();
                                }
                            }}
                        />
                        <motion.button
                            onClick={generate}
                            disabled={loading || !intent.trim()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={loading ? { scale: [1, 1.05, 1], transition: { repeat: Infinity } } : {}}
                        >
                            {loading ? 'Thinking...' : 'Generate ⏎'}
                        </motion.button>
                    </div>
                </div>
            </aside>

            {/* 2. Content Panel */}
            <main className="panel content-panel">
                <div className="panel-header tabs">
                    {['preview', 'code', 'split', 'json'].map((tab) => (
                        <button
                            key={tab}
                            className={activeTab === tab ? 'active' : ''}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'json' ? 'JSON Debug' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                            {activeTab === tab && (
                                <motion.div
                                    className="active-indicator"
                                    layoutId="underline"
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="stage">
                    <AnimatePresence mode="wait">

                        {activeTab === 'preview' && (
                            <motion.div
                                key="preview"
                                className="preview-canvas full"
                                variants={fadeVariants}
                                initial="hidden" animate="visible" exit="exit"
                            >
                                {previewPanel || children}
                            </motion.div>
                        )}

                        {activeTab === 'code' && (
                            <motion.div
                                key="code"
                                className="code-editor full"
                                variants={fadeVariants}
                                initial="hidden" animate="visible" exit="exit"
                            >
                                {codePanel}
                            </motion.div>
                        )}

                        {activeTab === 'split' && (
                            <motion.div
                                key="split"
                                className="split-view"
                                variants={fadeVariants}
                                initial="hidden" animate="visible" exit="exit"
                            >
                                <div className="split-pane code">
                                    {codePanel}
                                </div>
                                <div className="split-pane preview">
                                    <div className="preview-canvas">
                                        {previewPanel || children}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'json' && (
                            <motion.div
                                key="json"
                                className="json-viewer"
                                variants={fadeVariants}
                                initial="hidden" animate="visible" exit="exit"
                            >
                                <pre>{JSON.stringify(plan, null, 2)}</pre>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};
