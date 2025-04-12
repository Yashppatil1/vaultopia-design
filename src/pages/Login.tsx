
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AuthInput from "@/components/AuthInput";
import VaultLogo from "@/components/VaultLogo";
import SecurityAnimation from "@/components/SecurityAnimation";
import { Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [stage, setStage] = useState<"initial" | "authenticating" | "error">("initial");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!username) newErrors.username = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (showPin && !pin) newErrors.pin = "PIN is required";
    if (showPin && pin.length < 4) newErrors.pin = "PIN must be at least 4 digits";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setStage("authenticating");

    try {
      await signIn(username, password);
      // Navigation is handled by the auth state change listener
    } catch (error) {
      setStage("error");
    }
  };

  const handleTogglePin = () => {
    setShowPin(!showPin);
  };

  if (stage === "authenticating") {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <SecurityAnimation type="unlock" onComplete={() => {}} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-4">
      <div className="flex-1 flex flex-col items-center justify-center">
        <VaultLogo animated className="mb-8" />
        
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Welcome to Secure Vault
            </h1>
            <p className="text-muted-foreground">
              Sign in to access your encrypted data
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <AuthInput
              type="email"
              label="Email"
              value={username}
              onChange={setUsername}
              placeholder="Enter your email"
              error={errors.username}
            />

            <AuthInput
              type="password"
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              error={errors.password}
            />

            {showPin && (
              <AuthInput
                type="pin"
                label="PIN"
                value={pin}
                onChange={setPin}
                placeholder="Enter your 4-6 digit PIN"
                error={errors.pin}
              />
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="usePin"
                checked={showPin}
                onChange={handleTogglePin}
                className="h-4 w-4 rounded border-white/10 bg-secondary/50 text-vault-purple focus:ring-vault-purple"
              />
              <label
                htmlFor="usePin"
                className="ml-2 text-sm text-muted-foreground"
              >
                Use PIN authentication
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-vault-purple hover:bg-vault-purple-light text-white rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-vault-purple focus:ring-offset-2 focus:ring-offset-background"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-vault-purple hover:underline font-medium"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Lock className="h-3 w-3" /> Secure, Encrypted, Private
        </p>
      </div>
    </div>
  );
};

export default Login;
