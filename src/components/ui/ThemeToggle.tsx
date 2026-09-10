import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size={showLabel ? "sm" : "icon"}
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center gap-1.5 rounded-lg border border-border/50 text-foreground transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-gold ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4 text-gold" aria-hidden="true" />
          {showLabel && <span className="text-xs font-semibold text-gold">Light</span>}
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-navy-deep dark:text-gold" aria-hidden="true" />
          {showLabel && <span className="text-xs font-semibold">Dark</span>}
        </>
      )}
      <span className="sr-only">Toggle dark and light theme</span>
    </Button>
  );
}
