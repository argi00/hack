"use client";

import {
  feedbackPriorityLabels,
  feedbackPriorityColors,
  FeedbackPriority,
} from "@/lib/constants";

interface PriorityBadgeProps {
  priority: string;
  className?: string;
}

export function PriorityBadge({ priority, className = "" }: PriorityBadgeProps) {
  const label = feedbackPriorityLabels[priority as FeedbackPriority] || priority;
  const color = feedbackPriorityColors[priority as FeedbackPriority] || "#6B7280";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${className}`}
      style={{ backgroundColor: color }}
      role="status"
      aria-label={`Priorité: ${label}`}
    >
      {label}
    </span>
  );
}
