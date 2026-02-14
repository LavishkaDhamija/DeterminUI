import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

/**
 * 🔹 F3 - Code Panel (Editable)
 * 
 * Uses Monaco Editor (VS Code core) for a premium editing experience.
 * Allows evaluators to see and modify the generated JSX.
 */
export const CodePanel = ({
    code,         // Original generated code
    setEditedCode // Function to update code in parent (optional/advanced) 
}) => {

    // Local state if parent isn't managing edits yet
    const [value, setValue] = useState(code || '// No code generated yet');

    useEffect(() => {
        if (code) setValue(code);
    }, [code]);

    const handleEditorChange = (newValue) => {
        setValue(newValue);
        if (setEditedCode) {
            setEditedCode(newValue);
        }
    };

    return (
        <div className="code-panel" style={{ height: '100%', width: '100%' }}>
            <Editor
                height="100%"
                defaultLanguage="javascript"
                value={value}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16 }
                }}
                onChange={handleEditorChange}
            />
        </div>
    );
};
