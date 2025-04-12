
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AuthInput from "@/components/AuthInput";
import VaultLogo from "@/components/VaultLogo";
import SecurityAnimation from "@/components/SecurityAnimation";
import { Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const [stage, setStage] = useState<"initial" | "creating" | "error">("initial");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");
  const [usePin, setUsePin] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    if (usePin) {
      if (!pin) newErrors.pin = "PIN is required";
      else if (pin.length < 4) newErrors.pin = "PIN must be at least 4 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setStage("creating");

    try {
      await signUp(email, password, username);
      toast({
        title: "Account Created",
        description: "Please check your email for verification instructions",
      });
      navigate("/login");
    } catch (error) {
      setStage("error");
    }
  };

  const handleTogglePin = () => {
    setUsePin(!usePin);
  };

  if (stage === "creating") {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <SecurityAnimation type="lock" onComplete={() => {}} />
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
              Create Your Vault
            </h1>
            <p className="text-muted-foreground">
              Set up your secure, encrypted storage
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <AuthInput
              type="text"
              label="Username"
              value={username}
              onChange={setUsername}
              placeholder="Choose a username"
              error={errors.username}
            />

            <AuthInput
              type="email"
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
              error={errors.email}
            />

            <AuthInput
              type="password"
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="Create a strong password"
              error={errors.password}
            />

            <AuthInput
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                id="usePin"
                checked={usePin}
                onChange={handleTogglePin}
                className="h-4 w-4 rounded border-white/10 bg-secondary/50 text-vault-purple focus:ring-vault-purple"
              />
              <label
                htmlFor="usePin"
                className="ml-2 text-sm text-muted-foreground"
              >
                Set up PIN authentication
              </label>
            </div>

            {usePin && (
              <AuthInput
                type="pin"
                label="PIN"
                value={pin}
                onChange={setPin}
                placeholder="Create a 4-6 digit PIN"
                error={errors.pin}
              />
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-vault-purple hover:bg-vault-purple-light text-white rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-vault-purple focus:ring-offset-2 focus:ring-offset-background"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-vault-purple hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Lock className="h-3 w-3" /> Military-grade encryption
        </p>
      </div>
    </div>
  );
};

export default Signup;
