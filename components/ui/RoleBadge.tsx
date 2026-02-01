"use client";

import { roleLabels, roleColors, UserRole } from "@/lib/constants";

interface RoleBadgeProps {
  role: string;
  className?: string;
}

export function RoleBadge({ role, className = "" }: RoleBadgeProps) {
  const label = roleLabels[role as UserRole] || role;
  const color = roleColors[role as UserRole] || "#6B7280";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${className}`}
      style={{ backgroundColor: color }}
      role="status"
      aria-label={`Rôle: ${label}`}
    >
      {label}
    </span>
  );
}
