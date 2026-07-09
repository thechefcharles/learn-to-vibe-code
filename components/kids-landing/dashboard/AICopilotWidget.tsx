"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// AI Suggestion responses mapped to keywords
const SUGGESTIONS: Record<string, string> = {
  "drawing app":
    "Use HTML Canvas + JavaScript to draw. Save your art as images! Start with ctx.beginPath() and ctx.lineTo() to create shapes.",
  "chat bot":
    "Use string matching + arrays to build a simple bot. Learn to handle user input with prompt() and respond with arrays of replies.",
  game: "Build Pong with React. Use state for position, onClick for movement. Track score with useState and render with CSS.",
  "todo list":
    "Perfect beginner project. Learn useState, array methods, localStorage. Add, delete, mark complete—classic starter!",
};

interface TypewriterCharProps {
  char: string;
  index: number;
}

function TypewriterChar({ char, index }: TypewriterCharProps) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.03,
        delay: index * 0.03,
      }}
    >
      {char}
    </motion.span>
  );
}

export function AICopilotWidget() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);
  const typewriterIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const responseTextRef = useRef("");
  const charIndexRef = useRef(0);

  // Cleanup typewriter on unmount
  useEffect(() => {
    return () => {
      if (typewriterIntervalRef.current) {
        clearInterval(typewriterIntervalRef.current);
      }
    };
  }, []);

  const startTypewriter = (text: string) => {
    responseTextRef.current = text;
    charIndexRef.current = 0;
    setSuggestion("");
    setIsTyping(true);
    setHasResponded(true);

    typewriterIntervalRef.current = setInterval(() => {
      charIndexRef.current += 1;

      if (charIndexRef.current > text.length) {
        if (typewriterIntervalRef.current) {
          clearInterval(typewriterIntervalRef.current);
          typewriterIntervalRef.current = null;
        }
        setIsTyping(false);
        return;
      }

      setSuggestion(text.substring(0, charIndexRef.current));
    }, 30);
  };

  const handleSubmit = () => {
    if (!input.trim()) return;

    // Clear any existing typewriter
    if (typewriterIntervalRef.current) {
      clearInterval(typewriterIntervalRef.current);
      typewriterIntervalRef.current = null;
    }

    // Find matching suggestion
    const lowerInput = input.toLowerCase();
    let response = "That sounds cool! Try starting with HTML & CSS, then add JavaScript. What's your next idea?";

    for (const [key, value] of Object.entries(SUGGESTIONS)) {
      if (lowerInput.includes(key)) {
        response = value;
        break;
      }
    }

    startTypewriter(response);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isTyping && input.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="text-base text-gray-400 uppercase tracking-wide">🤖 AI Copilot</div>

      {/* Input Section */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What do you want to build?"
          disabled={isTyping}
          className="flex-1 px-3 py-2 bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg text-base text-white placeholder-gray-400 focus:border-cyan-300/80 focus:outline-none transition-colors disabled:opacity-50"
          aria-label="AI suggestion input"
        />
        <button
          onClick={handleSubmit}
          disabled={isTyping || !input.trim()}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-base font-bold transition-colors"
          aria-label="Ask AI for suggestion"
        >
          Ask
        </button>
      </div>

      {/* Suggestion Response */}
      {hasResponded && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-3 bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg text-base text-gray-300 overflow-y-auto"
        >
          <div className="flex gap-1 items-start">
            <span className="text-cyan-400 flex-shrink-0">→</span>
            <div className="flex-1 leading-relaxed">
              {suggestion}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-cyan-400 ml-1"
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
