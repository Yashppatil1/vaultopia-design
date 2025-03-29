
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface VaultLogoProps {
  animated?: boolean;
  className?: string;
}

const VaultLogo = ({ animated = false, className }: VaultLogoProps) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="rounded-full bg-vault-purple/10 p-3">
        <div className="rounded-full bg-vault-purple/20 p-2">
          <Lock 
            className={cn(
              "text-vault-purple h-8 w-8",
              animated && "animate-bounce-subtle"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default VaultLogo;
