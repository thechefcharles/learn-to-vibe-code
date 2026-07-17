import React from "react";
import { motion } from "framer-motion";

// Mapping of screenshot descriptions to manifest keys
const SCREENSHOT_MAP: Record<string, string> = {
  "AI Interview + Drafted Spec": "m03-ai-interview",
  "Technical Plan (Data Model + Screens)": "m03-technical-plan",
};

// Load manifest at build time
const figuresManifest = typeof window !== 'undefined' ? null : {};

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // H1
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={`h1-${i}`} className="text-4xl font-bold text-white mb-4 mt-8">
          {line.replace(/^#\s+/, "")}
        </h1>
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={`h2-${i}`} className="text-3xl font-bold text-white mb-6 mt-10">
          {line.replace(/^##\s+/, "")}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-2xl font-bold text-white mb-4 mt-8">
          {line.replace(/^###\s+/, "")}
        </h3>
      );
      i++;
      continue;
    }

    // Code block
    if (line.startsWith("```")) {
      const lang = line.replace(/^```/, "").trim() || "text";
      const codeLines: string[] = [];
      i++;

      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }

      elements.push(
        <motion.pre
          key={`code-${i}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-8 overflow-x-auto"
        >
          <code className="text-slate-200 text-sm font-mono leading-relaxed">
            {codeLines.join("\n")}
          </code>
        </motion.pre>
      );

      i++; // Skip closing ```
      continue;
    }

    // Blockquote
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];

      while (
        i < lines.length &&
        (lines[i].startsWith(">") || lines[i].trim() === "")
      ) {
        if (lines[i].startsWith(">")) {
          quoteLines.push(lines[i].replace(/^>\s*/, ""));
        } else if (lines[i].trim() === "" && quoteLines.length > 0) {
          quoteLines.push("");
        }
        i++;
      }

      elements.push(
        <motion.blockquote
          key={`quote-${i}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="border-l-4 border-blue-500 bg-blue-500/10 p-4 mb-6 text-slate-200 rounded-r-lg"
        >
          {quoteLines.map((qline, idx) => (
            <p key={idx} className="mb-2 leading-[1.75]">
              {renderInline(qline)}
            </p>
          ))}
        </motion.blockquote>
      );
      continue;
    }

    // Table
    if (line.includes("|")) {
      const tableLines: string[] = [line];
      i++;

      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }

      if (tableLines.length >= 3) {
        const headerRow = tableLines[0]
          .split("|")
          .map((cell) => cell.trim())
          .filter(Boolean);
        const bodyRows = tableLines.slice(2).map((row) =>
          row
            .split("|")
            .map((cell) => cell.trim())
            .filter(Boolean)
        );

        elements.push(
          <motion.div
            key={`table-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-lg overflow-hidden border border-slate-600"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800">
                  {headerRow.map((cell, idx) => (
                    <th
                      key={idx}
                      className="border border-slate-600 p-3 text-left text-white font-semibold"
                    >
                      {renderInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ridx) => (
                  <tr key={ridx} className="hover:bg-slate-700/50 transition-colors">
                    {row.map((cell, cidx) => (
                      <td
                        key={cidx}
                        className="border border-slate-600 p-3 text-slate-200"
                      >
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        );
      }
      continue;
    }

    // Screenshot (both formats: [SCREENSHOT: ...] and [SCREENSHOT PLACEHOLDER: ...])
    if (line.includes("[SCREENSHOT")) {
      const screenshotMatch = line.match(/\[SCREENSHOT(?:\s+PLACEHOLDER)?:\s*([^\]]+)\]/);
      if (screenshotMatch) {
        const description = screenshotMatch[1].trim();
        // Map description to manifest key
        let imagePath: string | null = null;
        const mappedKey = SCREENSHOT_MAP[description];

        if (mappedKey) {
          // Use hardcoded mapping
          const paths: Record<string, string> = {
            "m03-ai-interview": "/figures/m03/m03-ai-interview.png",
            "m03-technical-plan": "/figures/m03/m03-technical-plan.png",
            "m06-shadcn-components": "/figures/m06-shadcn-components.svg",
            "m11-workflow-diagram": "/figures/m11-workflow-diagram.svg",
            "m12-tests": "/figures/m12/m12-tests.png",
          };
          imagePath = paths[mappedKey] || null;
        }

        elements.push(
          <motion.div
            key={`screenshot-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg overflow-hidden mb-8 border border-slate-600"
          >
            {imagePath ? (
              <img
                src={imagePath}
                alt={description}
                className="w-full h-auto"
              />
            ) : (
              <div className="bg-amber-500/10 border-2 border-amber-500/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">📸</div>
                  <div className="flex-1">
                    <p className="font-bold text-amber-400 mb-2 uppercase text-xs tracking-wider">Screenshot</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );
      }
      i++;
      continue;
    }

    // Unordered list with checkmarks or dashes
    if (line.match(/^[\s]*[-•]\s+(.*)/) || line.match(/^[\s]*[-•]\s+✅/) || line.match(/^[\s]*✅\s+/)) {
      const listLines: string[] = [];

      // Collect all consecutive list items (including dashes followed by checkmarks)
      while (i < lines.length && (lines[i].match(/^[\s]*[-•]\s+/) || lines[i].match(/^[\s]*✅\s+/) || lines[i].trim() === "")) {
        if (lines[i].trim() !== "") {
          listLines.push(lines[i]);
        }
        i++;
      }

      // Check if this is a checkmark list (items contain ✅ or ✓ after the dash/bullet)
      const isCheckmarkList = listLines.some(item => {
        // Match: "- ✅ text" or "✅ text"
        return item.match(/^[\s]*[-•]?\s*✅/) || item.match(/^[\s]*[-•]?\s*✓/);
      });

      if (isCheckmarkList && listLines.length > 0) {
        // Render as special checkmark card
        elements.push(
          <motion.div
            key={`checklist-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg p-4 mb-8 border bg-emerald-500/10 border-emerald-500/30"
          >
            <p className="text-xs text-emerald-400 uppercase tracking-wider mb-4 font-bold">
              ✓ BY THE END
            </p>
            <ul className="space-y-2.5">
              {listLines.map((item, idx) => {
                // Remove dash/bullet and checkmark emoji
                const cleanItem = item
                  .replace(/^[\s]*[-•]\s*/, "")
                  .replace(/^✅\s*/, "")
                  .replace(/^✓\s*/, "")
                  .trim();
                return (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    className="flex items-start gap-3 text-slate-200 text-sm leading-relaxed"
                  >
                    <span className="text-emerald-400 font-bold text-base flex-shrink-0 mt-0.5">✓</span>
                    <span className="pt-0.5">{renderInline(cleanItem)}</span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        );
      } else {
        // Regular list
        elements.push(
          <ul key={`list-${i}`} className="space-y-2 mb-8 ml-4">
            {listLines.map((item, idx) => {
              const cleanItem = item.replace(/^[\s]*[-•]\s+/, "").trim();
              return (
                <li key={idx} className="text-slate-300 leading-[1.75] list-disc">
                  {renderInline(cleanItem)}
                </li>
              );
            })}
          </ul>
        );
      }
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      elements.push(<div key={`empty-${i}`} className="mb-2" />);
      i++;
      continue;
    }

    // Paragraph with inline formatting
    if (line.trim()) {
      elements.push(
        <p key={`p-${i}`} className="text-slate-300 mb-4 leading-[1.75]">
          {renderInline(line)}
        </p>
      );
    }

    i++;
  }

  return <div className="prose prose-invert max-w-none">{elements}</div>;
}

function renderInline(text: string): React.ReactNode {
  const processedText = text
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (m, alt, url) => `__IMAGE_START__${alt}__IMAGE_SEP__${url}__IMAGE_END__`)
    .replace(/\*\*([^*]+)\*\*/g, (m, content) => `__BOLD_START__${content}__BOLD_END__`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, url) => `__LINK_START__${text}__LINK_SEP__${url}__LINK_END__`);

  const segments = processedText.split(/(__[A-Z_]+__|__)/);
  const processed = new Set<number>();

  return segments.map((segment, idx) => {
    if (processed.has(idx) || !segment) return null;

    if (segment === "__BOLD_START__") {
      processed.add(idx + 1);
      processed.add(idx + 2);
      const content = segments[idx + 1];
      return (
        <strong key={idx} className="font-bold text-white">
          {content}
        </strong>
      );
    }

    if (segment === "__IMAGE_START__") {
      processed.add(idx + 1);
      processed.add(idx + 2);
      processed.add(idx + 3);
      processed.add(idx + 4);
      const alt = segments[idx + 1];
      const url = segments[idx + 3];
      return (
        <img
          key={idx}
          src={url}
          alt={alt}
          loading="lazy"
          className="w-full rounded-lg mb-4 border border-slate-600"
        />
      );
    }

    if (segment === "__LINK_START__") {
      processed.add(idx + 1);
      processed.add(idx + 2);
      processed.add(idx + 3);
      processed.add(idx + 4);
      const content = segments[idx + 1];
      const url = segments[idx + 3];
      return (
        <a
          key={idx}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          {content}
        </a>
      );
    }

    if (segment.startsWith("__")) {
      return null;
    }

    return <span key={idx}>{segment}</span>;
  });
}
