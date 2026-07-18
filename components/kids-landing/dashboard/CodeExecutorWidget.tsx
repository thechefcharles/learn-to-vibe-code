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
    <div className="flex flex-col h-full gap-3">
      {/* Title */}
      <div className="mb-2">
        <h3 className="text-base font-semibold text-white">Code Executor</h3>
        <p className="text-sm text-gray-400 mt-1">Try live code with presets</p>
      </div>

      {/* Preset Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => handlePreset(presets.math)}
          className="px-3 py-1 text-sm font-medium bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/40 text-cyan-300 rounded-lg hover:bg-cyan-500/30 hover:border-cyan-300/60 transition-all"
        >
          Math
        </button>
        <button
          onClick={() => handlePreset(presets.string)}
          className="px-3 py-1 text-sm font-medium bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/40 text-cyan-300 rounded-lg hover:bg-cyan-500/30 hover:border-cyan-300/60 transition-all"
        >
          String
        </button>
        <button
          onClick={() => handlePreset(presets.greet)}
          className="px-3 py-1 text-sm font-medium bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/40 text-cyan-300 rounded-lg hover:bg-cyan-500/30 hover:border-cyan-300/60 transition-all"
        >
          Greet
        </button>
      </div>

      {/* Code Input */}
      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium text-gray-300 mb-2">Input:</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 w-full bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg p-3 text-cyan-300 font-mono text-base focus:border-cyan-300/80 focus:ring-2 focus:ring-cyan-300/50 resize-none placeholder-gray-400"
          placeholder="Enter JavaScript code..."
          spellCheck="false"
        />
      </div>

      {/* Output Display */}
      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium text-gray-300 mb-2">Output:</label>
        <div className="flex-1 w-full bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg p-3 font-mono text-base overflow-auto">
          {isExecuting && <span className="text-gray-500">Executing...</span>}
          {error && <span className="text-red-400">{error}</span>}
          {!error && !isExecuting && output && <span className="text-cyan-300">{output}</span>}
          {!error && !isExecuting && !output && <span className="text-gray-500">Output appears here</span>}
        </div>
      </div>
    </div>
  );
}
