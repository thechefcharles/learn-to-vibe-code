"use client";

import { motion } from "framer-motion";

interface Resource {
  title: string;
  url: string;
  type: "docs" | "video" | "article";
}

interface StepResourcesFooterProps {
  resources?: Resource[];
  nextStepTitle?: string;
}

export function StepResourcesFooter({ resources, nextStepTitle }: StepResourcesFooterProps) {
  if (!resources || resources.length === 0) {
    return null;
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "docs":
        return "📚";
      case "video":
        return "🎥";
      case "article":
        return "📰";
      default:
        return "🔗";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6"
    >
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-4 font-medium">
        Related Resources
      </p>

      <div className="space-y-3 mb-6">
        {resources.map((resource, idx) => (
          <a
            key={idx}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition border border-slate-600/50 hover:border-slate-500"
          >
            <span className="text-lg mt-0.5 flex-shrink-0">
              {getResourceIcon(resource.type)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200 font-medium group-hover:text-white transition break-words">
                {resource.title}
              </p>
              <p className="text-xs text-slate-500 mt-1 group-hover:text-slate-400 transition">
                {resource.type === "docs"
                  ? "Documentation"
                  : resource.type === "video"
                    ? "Video"
                    : "Article"}
              </p>
            </div>
            <span className="text-slate-400 group-hover:text-slate-300 transition flex-shrink-0 mt-0.5">
              ↗
            </span>
          </a>
        ))}
      </div>

      {nextStepTitle && (
        <div className="pt-4 border-t border-slate-700">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-medium">
            Next Topic
          </p>
          <p className="text-sm text-slate-300">{nextStepTitle}</p>
        </div>
      )}
    </motion.div>
  );
}
