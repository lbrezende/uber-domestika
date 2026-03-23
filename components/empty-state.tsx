import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="h-16 w-16 rounded-full bg-violet-50 flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-violet-400" />
      </div>

      <h3 className="text-lg font-semibold text-foreground">{title}</h3>

      <p className="mt-1 text-sm text-muted-foreground max-w-sm">
        {description}
      </p>

      {action && (
        <Button asChild className="mt-6 bg-violet-600 hover:bg-violet-700">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
