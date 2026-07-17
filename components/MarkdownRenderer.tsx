import React from "react";
import { motion } from "framer-motion";

// Mapping of screenshot descriptions (from lessons) to manifest keys
const SCREENSHOT_MAP: Record<string, string> = {
  // Module 0
  "Next.js Starter Page": "m00-nextjs-starter",
  // Module 1
  "Prompt Context Effect": "m01-same-prompt-twice",
  "Hallucination Example": "m01-hallucination",
  // Module 2
  "Weak vs. Strong Prompt Outputs": "m02-weak-vs-strong",
  "Refinement Loop Exchange": "m02-refinement",
  "Multimodal Prompt (Mockup → Generated UI)": "m02-mockup-source",
  // Module 3
  "AI Interview + Drafted Spec": "m03-ai-interview",
  "Technical Plan (Data Model + Screens)": "m03-technical-plan",
  // Module 4
  "/Clients Page with Table": "m04-clients-table",
  "Create Client Form": "m04-create-form",
  "@-Mention Menu": "m04-cursor-at-mention",
  "@-Mention Menu in Cursor Chat": "m04-cursor-at-mention",
  "Cmd+K Inline Edit": "m04-cursor-cmdk",
  "Cmd+K Inline Edit Diff": "m04-cursor-cmdk",
  "Composer Multi-File Diff": "m04-cursor-composer",
  "Composer Unified Diff (Multi-File)": "m04-cursor-composer",
  // Module 5
  "Invoices List Page": "m05-invoices-table",
  "Create Invoice Form": "m05-invoice-form",
  "Claude Code Welcome": "m05-claude-welcome",
  "CLAUDE.md File": "m05-claude-md",
  "Plan Mode Output": "m05-claude-plan-mode",
  "Multi-File Diff": "m05-claude-multifile",
  "Permission Prompt": "m05-claude-permission",
  // Module 6
  'Plain UI ("Before")': "m06-before-clients",
  'Restyled UI ("After")': "m06-clients-styled",
  // Alias for module 6 before/after
  "Plain UI": "m06-before-clients",
  "Restyled UI": "m06-clients-styled",
  "Responsive Mobile View": "m06-clients-mobile",
  "Claude Design Prototype": "m06-claude-design-prototype",
  "shadcn/ui Components": "m06-shadcn-components",
  // Module 7
  "App Sign-Out State": "m07-signed-out",
  "App Signed-In State": "m07-signed-in",
  "Supabase API Settings": "m07-supabase-api-keys",
  "Supabase Auth users list after a test signup.": "m07-supabase-auth-users",
  "Tables in Supabase Editor": "m07-supabase-table-editor",
  "an RLS policy on the clients table.": "m07-supabase-rls-policy",
  "the Supabase Auth users list after a test signup.": "m07-supabase-auth-users",
  // Module 8
  "Next.js Error Overlay": "m08-error-overlay",
  "Error Overlay": "m08-error-overlay",
  "Debugging Chat": "m08-debugging-chat",
  // Module 9
  "GitHub Repo Page": "m09-github-repo",
  "a GitHub pull request showing the diff and merge button.": "m09-pr-diff",
  // Module 10
  "GitHub PR with Preview Link": "m10-vercel-preview-link",
  "Vercel Import Project": "m10-vercel-import",
  "Vercel Env Vars Settings": "m10-vercel-env",
  "Vercel Deployments History": "m10-vercel-deployments",
  "the Supabase Auth URL configuration with the production Site URL and redirect URLs.": "m10-supabase-prod-auth",
  // Module 11
  "Approval Queue UI": "m11-approval-queue",
  "Workflow Diagram": "m11-workflow-diagram",
  // Module 12
  "Empty & Error States": "m12-empty",
  "Lighthouse Report": "m12-lighthouse",
  "Test Run Output": "m12-tests",
  // Module 13
  "Claude Code opening a PR and reporting a successful deploy from the terminal.": "m13-automated-pr-deploy",
  "\`/plugin install\` adding a plugin.": "m13-plugin-install",
  "MCP List Output": "m13-mcp-list",
  "Skill Install": "m13-skill-install",
  // Module 14
  "Repo Architecture Summary": "m14-architecture-summary",
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
          // Map manifest keys to actual file paths
          const paths: Record<string, string> = {
            "m00-nextjs-starter": "/figures/m00/m00-01-nextjs-starter.png",
            "m00-cursor-welcome": "/figures/m00/m00-cursor-welcome.png",
            "m00-terminal-versions": "/figures/m00/m00-terminal-versions.png",
            "m01-same-prompt-twice": "/figures/m01/m01-same-prompt-twice.png",
            "m01-hallucination": "/figures/m01/m01-hallucination.png",
            "m02-weak-vs-strong": "/figures/m02/m02-weak-vs-strong-1-weak.png",
            "m02-refinement": "/figures/m02/m02-refinement.png",
            "m02-mockup-source": "/figures/m02/m02-mockup-source.png",
            "m03-ai-interview": "/figures/m03/m03-ai-interview.png",
            "m03-technical-plan": "/figures/m03/m03-technical-plan.png",
            "m04-clients-table": "/figures/m04/m04-01-clients-table.png",
            "m04-create-form": "/figures/m04/m04-02-create-form.png",
            "m04-cursor-at-mention": "/figures/m04/m04-cursor-at-mention.png",
            "m04-cursor-cmdk": "/figures/m04/m04-cursor-cmdk-diff.png",
            "m04-cursor-composer": "/figures/m04/m04-cursor-composer-diff.png",
            "m05-invoices-table": "/figures/m05/m05-01-invoices-table.png",
            "m05-invoice-form": "/figures/m05/m05-02-invoice-form.png",
            "m05-claude-welcome": "/figures/m05/m05-claude-welcome.png",
            "m05-claude-md": "/figures/m05/m05-claude-md.png",
            "m05-claude-plan-mode": "/figures/m05/m05-claude-plan-mode.png",
            "m05-claude-multifile": "/figures/m05/m05-claude-multifile-diff.png",
            "m05-claude-permission": "/figures/m05/m05-claude-permission.png",
            "m06-before-clients": "/figures/module-06-before-plain-ui-clients.svg",
            "m06-before-invoices": "/figures/module-06-before-plain-ui-invoices.svg",
            "m06-clients-styled": "/figures/m06/m06-01-clients-styled.png",
            "m06-clients-mobile": "/figures/m06/m06-02-clients-mobile.png",
            "m06-invoices-mobile": "/figures/m06/m06-03-invoices-mobile.png",
            "m06-claude-design-home": "/figures/m06/m06-claude-design-home.png",
            "m06-claude-design-prototype": "/figures/m06/m06-claude-design-prototype.png",
            "m06-shadcn-components": "/figures/m06-shadcn-components.svg",
            "m07-signed-out": "/figures/m07/m07-01-signed-out.png",
            "m07-signed-in": "/figures/m07/m07-02-signed-in-clients.png",
            "m07-supabase-api-keys": "/figures/m07/m07-supabase-api-keys.png",
            "m07-supabase-auth-users": "/figures/m07/m07-supabase-auth-users.png",
            "m07-supabase-table-editor": "/figures/m07/m07-supabase-table-editor.png",
            "m07-supabase-rls-policy": "/figures/m07/m07-supabase-rls-policy.png",
            "m08-error-overlay": "/figures/m08/m08-01-error-overlay.png",
            "m08-debugging-chat": "/figures/m08/m08-debugging-chat.png",
            "m09-github-repo": "/figures/m09/m09-01-github-repo.png",
            "m09-pr-diff": "/figures/m09/m09-02-pr-diff.png",
            "m10-vercel-import": "/figures/m10/m10-vercel-import.png",
            "m10-vercel-env": "/figures/m10/m10-vercel-env.png",
            "m10-vercel-deployments": "/figures/m10/m10-vercel-deployments.png",
            "m10-vercel-preview-link": "/figures/m10/m10-vercel-preview-link.png",
            "m10-supabase-prod-auth": "/figures/m10/m10-supabase-prod-auth-urls.png",
            "m11-approval-queue": "/figures/m11/m11-01-approval-queue.png",
            "m11-workflow-diagram": "/figures/m11-workflow-diagram.svg",
            "m12-loading": "/figures/m12/m12-01-loading.png",
            "m12-empty": "/figures/m12/m12-02-empty.png",
            "m12-error": "/figures/m12/m12-03-error.png",
            "m12-lighthouse": "/figures/m12/m12-lighthouse.png",
            "m12-tests": "/figures/m12/m12-tests.png",
            "m13-automated-pr-deploy": "/figures/m13/m13-01-automated-pr-deploy.png",
            "m13-mcp-list": "/figures/m13/m13-mcp-list.png",
            "m13-plugin-install": "/figures/m13/m13-plugin-install.png",
            "m13-skill-install": "/figures/m13/m13-skill-install.png",
            "m13-notion-checklist": "/figures/m13/m13-notion-checklist.png",
            "m14-architecture-summary": "/figures/m14/m14-architecture-summary.png",
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
