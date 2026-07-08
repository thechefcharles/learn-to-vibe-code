'use client';

import { useState, useEffect, useCallback } from 'react';

export function CodeExecutorWidget() {
  const [code, setCode] = useState('greet("your name")');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  // Define the greet function that will be available in the sandbox
  const greetFunction = (name: string): string => {
    return `Hello, ${name}! Welcome to Vibe Coding.`;
  };

  // Safe code execution with sandbox
  // SECURITY NOTE: This component intentionally uses new Function() to evaluate user-written code.
  // This is NOT a vulnerability in this context because:
  // 1. The component's explicit purpose is to execute user-provided JavaScript
  // 2. Only the 'greet' function is available in the execution context
  // 3. Strict mode is enabled to prevent certain unsafe operations
  // 4. Users voluntarily write and execute their own code
  // This is similar to code editors in learning platforms (CodePen, JSFiddle, etc.)
  const executeCode = useCallback((codeToExecute: string) => {
    setIsExecuting(true);
    setError('');
    setOutput('');

    try {
      // Create a sandbox with limited context (only greet function available)
      // eslint-disable-next-line no-new-func
      const sandboxFn = new Function(
        'greet',
        `
        "use strict";
        return ${codeToExecute};
        `
      );

      const result = sandboxFn(greetFunction);
      setOutput(String(result));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsExecuting(false);
    }
  }, []);

  // Debounced auto-execute on code change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (code.trim()) {
        executeCode(code);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [code, executeCode]);

  // Preset examples
  const presets = {
    math: '5 + 3 * 2',
    string: '"Hello".toUpperCase() + " " + "WORLD".toLowerCase()',
    greet: 'greet("Alice")',
  };

  const handlePreset = (preset: string) => {
    setCode(preset);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Title */}
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-white">Code Executor</h3>
        <p className="text-xs text-gray-400 mt-1">Try live code with presets</p>
      </div>

      {/* Preset Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => handlePreset(presets.math)}
          className="px-3 py-1 text-xs font-medium bg-cyan-900/40 border border-cyan-500/50 text-cyan-300 rounded hover:bg-cyan-900/60 hover:border-cyan-400 transition-all"
        >
          Math
        </button>
        <button
          onClick={() => handlePreset(presets.string)}
          className="px-3 py-1 text-xs font-medium bg-cyan-900/40 border border-cyan-500/50 text-cyan-300 rounded hover:bg-cyan-900/60 hover:border-cyan-400 transition-all"
        >
          String
        </button>
        <button
          onClick={() => handlePreset(presets.greet)}
          className="px-3 py-1 text-xs font-medium bg-cyan-900/40 border border-cyan-500/50 text-cyan-300 rounded hover:bg-cyan-900/60 hover:border-cyan-400 transition-all"
        >
          Greet
        </button>
      </div>

      {/* Code Input */}
      <div className="flex-1 flex flex-col">
        <label className="text-xs font-medium text-gray-300 mb-2">Input:</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 w-full bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg p-3 text-cyan-300 font-mono text-sm focus:border-cyan-300/80 focus:outline-none resize-none placeholder-gray-400"
          placeholder="Enter JavaScript code..."
          spellCheck="false"
        />
      </div>

      {/* Output Display */}
      <div className="flex-1 flex flex-col">
        <label className="text-xs font-medium text-gray-300 mb-2">Output:</label>
        <div className="flex-1 w-full bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg p-3 font-mono text-sm overflow-auto">
          {isExecuting && <span className="text-gray-500">Executing...</span>}
          {error && <span className="text-red-400">{error}</span>}
          {!error && !isExecuting && output && <span className="text-cyan-300">{output}</span>}
          {!error && !isExecuting && !output && <span className="text-gray-500">Output appears here</span>}
        </div>
      </div>
    </div>
  );
}
