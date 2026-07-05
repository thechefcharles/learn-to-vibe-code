interface CapstoneReviewCardProps {
  submission: any;
}

export default function CapstoneReviewCard({ submission }: CapstoneReviewCardProps) {
  const result = submission.result || "pending";
  const statusColorMap: Record<string, string> = {
    pending: "border-yellow-500",
    pass: "border-green-500",
    fail: "border-red-500",
  };
  const statusLabelMap: Record<string, string> = {
    pending: "⏳ Pending Review",
    pass: "✅ Passed",
    fail: "❌ Failed",
  };

  const statusColor = statusColorMap[result];
  const statusLabel = statusLabelMap[result];

  return (
    <div className={`bg-slate-800 rounded-lg p-6 border-2 ${statusColor}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-slate-400">{statusLabel}</p>
        </div>
        <div className="text-sm text-slate-400">
          {new Date(submission.submitted_at).toLocaleDateString()}
        </div>
      </div>

      <div className="mb-4">
        <div className="space-y-2 text-sm">
          <p>
            <span className="text-slate-400">Repository: </span>
            <a
              href={submission.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 break-all"
            >
              {submission.repo_url}
            </a>
          </p>
          <p>
            <span className="text-slate-400">Live: </span>
            <a
              href={submission.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 break-all"
            >
              {submission.live_url}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
