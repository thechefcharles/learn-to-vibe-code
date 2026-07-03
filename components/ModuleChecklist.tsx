"use client";

import { useState, useEffect } from "react";
import { toggleChecklistItem, markModuleComplete } from "@/lib/actions/course";

interface ChecklistItem {
  key: string;
  label: string;
}

interface ModuleChecklistProps {
  moduleId: number;
  initialChecked: Record<string, boolean>;
  onComplete?: () => void;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { key: "watched", label: "Watched the lesson" },
  { key: "exercise", label: "Completed the hands-on exercise" },
  { key: "quiz", label: "Passed the quiz" },
  { key: "deliverable", label: "Submitted the deliverable" },
];

export function ModuleChecklist({
  moduleId,
  initialChecked,
  onComplete,
}: ModuleChecklistProps) {
  const [checked, setChecked] = useState(initialChecked);
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(false);

  const checkCount = Object.values(checked).filter(Boolean).length;
  const isComplete = checkCount === CHECKLIST_ITEMS.length;

  useEffect(() => {
    setCompleted(isComplete);
  }, [isComplete]);

  const handleToggle = async (key: string) => {
    setSaving(true);
    try {
      const newValue = !checked[key];
      setChecked((prev) => ({ ...prev, [key]: newValue }));
      await toggleChecklistItem(moduleId, key, newValue);
    } catch (error) {
      console.error("Failed to save checklist:", error);
      setChecked((prev) => ({ ...prev, [key]: !checked[key] }));
    } finally {
      setSaving(false);
    }
  };

  const handleMarkComplete = async () => {
    if (!isComplete) return;

    setSaving(true);
    try {
      await markModuleComplete(moduleId);
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Failed to mark module complete:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-12 p-6 bg-slate-800 border border-slate-700 rounded-lg">
      <h3 className="text-lg font-bold text-white mb-4">Module Checklist</h3>

      <div className="space-y-3 mb-6">
        {CHECKLIST_ITEMS.map((item) => (
          <label key={item.key} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={checked[item.key] || false}
              onChange={() => handleToggle(item.key)}
              disabled={saving}
              className="w-5 h-5 rounded bg-slate-700 border-slate-600 cursor-pointer"
            />
            <span className="text-slate-300">{item.label}</span>
          </label>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-400">
          Progress: {checkCount} of {CHECKLIST_ITEMS.length} completed
        </div>
        <button
          onClick={handleMarkComplete}
          disabled={!isComplete || saving}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            isComplete
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-slate-700 text-slate-400 cursor-not-allowed"
          }`}
        >
          {saving ? "Saving..." : "Mark Complete"}
        </button>
      </div>

      {completed && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2">
          <span className="text-green-400 text-sm">
            ✓ Module completed! Next module will unlock.
          </span>
        </div>
      )}
    </div>
  );
}
