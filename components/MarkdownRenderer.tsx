import React from "react";

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
        <h2 key={`h2-${i}`} className="text-3xl font-bold text-white mb-4 mt-8">
          {line.replace(/^##\s+/, "")}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-2xl font-bold text-white mb-3 mt-6">
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
        <pre
          key={`code-${i}`}
          className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-4 overflow-x-auto"
        >
          <code className="text-slate-200 text-sm font-mono">
            {codeLines.join("\n")}
          </code>
        </pre>
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
        <blockquote
          key={`quote-${i}`}
          className="border-l-4 border-blue-500 bg-blue-500/10 p-4 mb-4 text-slate-200"
        >
          {quoteLines.map((qline, idx) => (
            <p key={idx} className="mb-2">
              {renderInline(qline)}
            </p>
          ))}
        </blockquote>
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
          <table
            key={`table-${i}`}
            className="w-full border-collapse border border-slate-600 mb-4"
          >
            <thead>
              <tr className="bg-slate-800">
                {headerRow.map((cell, idx) => (
                  <th
                    key={idx}
                    className="border border-slate-600 p-2 text-left text-white"
                  >
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ridx) => (
                <tr key={ridx} className="hover:bg-slate-700">
                  {row.map((cell, cidx) => (
                    <td
                      key={cidx}
                      className="border border-slate-600 p-2 text-slate-200"
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      continue;
    }

    // Screenshot placeholder
    if (line.includes("[SCREENSHOT:")) {
      const screenshotMatch = line.match(/\[SCREENSHOT:\s*([^\]]+)\]/);
      if (screenshotMatch) {
        const description = screenshotMatch[1].trim();
        elements.push(
          <div
            key={`screenshot-${i}`}
            className="bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-6 mb-4"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">📸</div>
              <div className="flex-1">
                <p className="font-bold text-amber-400 mb-2">Screenshot</p>
                <p className="text-slate-300 text-sm italic">{description}</p>
              </div>
            </div>
          </div>
        );
      }
      i++;
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
        <p key={`p-${i}`} className="text-slate-300 mb-4 leading-relaxed">
          {renderInline(line)}
        </p>
      );
    }

    i++;
  }

  return <div className="prose prose-invert max-w-none">{elements}</div>;
}

function renderInline(text: string): React.ReactNode {
  // Handle [SCREENSHOT: ...] placeholders
  if (text.includes("[SCREENSHOT:")) {
    text = text.replace(
      /\[SCREENSHOT:\s*([^\]]+)\]/g,
      (match, alt) =>
        `<img src="/placeholder.svg" alt="${alt}" class="w-full rounded-lg mb-4 border border-slate-600" />`
    );
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // Bold
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let match;

  const processedText = text
    .replace(/\*\*([^*]+)\*\*/g, (m, content) => `__BOLD_START__${content}__BOLD_END__`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, url) => `__LINK_START__${text}__LINK_SEP__${url}__LINK_END__`);

  const segments = processedText.split(/(__[A-Z_]+__|__)/);

  return segments.map((segment, idx) => {
    if (!segment) return null;

    if (segment === "__BOLD_START__") {
      const content = segments[idx + 1];
      return (
        <strong key={idx} className="font-bold text-white">
          {content}
        </strong>
      );
    }

    if (segment === "__BOLD_END__") {
      return null;
    }

    if (segment === "__LINK_START__") {
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
