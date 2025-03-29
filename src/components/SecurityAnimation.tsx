
import { Lock, Unlock } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SecurityAnimationProps {
  type: "lock" | "unlock";
  onComplete?: () => void;
  className?: string;
}

const SecurityAnimation = ({
  type,
  onComplete,
  className,
}: SecurityAnimationProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage < 3) {
        setStage(stage + 1);
      } else if (onComplete) {
        onComplete();
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [stage, onComplete]);

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      <div className={cn(
        "relative p-4 rounded-full bg-vault-purple/10",
        type === "lock" ? "animate-lock" : "animate-unlock"
      )}>
        {type === "lock" ? (
          <Lock className="h-12 w-12 text-vault-purple animate-pulse-slow" />
        ) : (
          <Unlock className="h-12 w-12 text-vault-purple animate-pulse-slow" />
        )}
      </div>
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              i <= stage
                ? "bg-vault-purple scale-110"
                : "bg-vault-purple/30"
            )}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        {type === "lock" ? "Securing your data..." : "Unlocking your vault..."}
      </p>
    </div>
  );
};

export default SecurityAnimation;
