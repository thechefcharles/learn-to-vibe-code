interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({
  current,
  max,
  label,
  showPercentage = true,
  size = "md",
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-ink">{label}</span>}
          {showPercentage && (
            <span className="text-xs font-medium text-slate">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className={`w-full bg-violet-light/20 rounded-full overflow-hidden ${sizeClasses[size]}`}
      >
        <div
          className={`
            h-full bg-lime transition-all duration-300 ease-out rounded-full
            flex items-center justify-end pr-1
            prefers-reduced-motion:transition-none
          `}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || "Progress"}
        >
          {percentage > 20 && (
            <svg
              className="w-1.5 h-1.5 text-ink"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
