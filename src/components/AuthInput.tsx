
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AuthInputProps {
  type: "text" | "password" | "email" | "pin";
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

const AuthInput = ({
  type,
  label,
  value,
  onChange,
  placeholder,
  error,
  className,
}: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "pin" && !/^\d*$/.test(e.target.value)) return;
    onChange(e.target.value);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <input
          type={
            type === "password" 
              ? showPassword 
                ? "text" 
                : "password" 
              : type === "pin" 
                ? "tel" 
                : type
          }
          value={value}
          onChange={handleChange}
          className={cn(
            "w-full p-2 bg-secondary/50 border border-white/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-vault-purple transition-all",
            error && "border-destructive focus:ring-destructive"
          )}
          placeholder={placeholder}
          maxLength={type === "pin" ? 6 : undefined}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default AuthInput;
