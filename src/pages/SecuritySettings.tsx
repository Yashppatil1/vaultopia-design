
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Fingerprint, Key, Lock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const SecuritySettings = () => {
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoLockTime, setAutoLockTime] = useState("5");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSaveChanges = () => {
    // In a real app, we would call an API to update settings
    toast({
      title: "Settings saved",
      description: "Your security settings have been updated",
    });
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/settings")}
          className="p-2 rounded-full bg-secondary/50"
        >
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <h1 className="text-xl font-bold">Advanced Security</h1>
      </div>

      <div className="space-y-6">
        {/* Biometric Authentication */}
        <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-vault-purple/10 p-2">
              <Fingerprint className="h-5 w-5 text-vault-purple" />
            </div>
            <div>
              <h3 className="font-medium">Biometric Authentication</h3>
              <p className="text-sm text-muted-foreground">Unlock with fingerprint or face</p>
            </div>
          </div>
          <Switch
            checked={biometricAuth}
            onCheckedChange={setBiometricAuth}
          />
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-vault-purple/10 p-2">
              <Shield className="h-5 w-5 text-vault-purple" />
            </div>
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
          </div>
          <Switch
            checked={twoFactorAuth}
            onCheckedChange={setTwoFactorAuth}
          />
        </div>

        {/* Auto-Lock Timer */}
        <div className="space-y-3 p-3 bg-card rounded-lg border border-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-vault-purple/10 p-2">
              <Lock className="h-5 w-5 text-vault-purple" />
            </div>
            <div>
              <h3 className="font-medium">Auto-Lock Timer</h3>
              <p className="text-sm text-muted-foreground">Lock app after inactivity</p>
            </div>
          </div>
          <select
            value={autoLockTime}
            onChange={(e) => setAutoLockTime(e.target.value)}
            className="w-full mt-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-vault-purple"
          >
            <option value="1">1 minute</option>
            <option value="5">5 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        {/* Master Password Requirements */}
        <div className="space-y-3 p-3 bg-card rounded-lg border border-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-vault-purple/10 p-2">
              <Key className="h-5 w-5 text-vault-purple" />
            </div>
            <div>
              <h3 className="font-medium">Master Password Requirements</h3>
              <p className="text-sm text-muted-foreground">Set minimum complexity</p>
            </div>
          </div>
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="uppercase" defaultChecked className="rounded bg-white/5 border-white/10" />
              <label htmlFor="uppercase" className="text-sm">Require uppercase letter</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="number" defaultChecked className="rounded bg-white/5 border-white/10" />
              <label htmlFor="number" className="text-sm">Require number</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="special" defaultChecked className="rounded bg-white/5 border-white/10" />
              <label htmlFor="special" className="text-sm">Require special character</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="length" defaultChecked className="rounded bg-white/5 border-white/10" />
              <label htmlFor="length" className="text-sm">Minimum 12 characters</label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveChanges}
          className="w-full py-2 px-4 bg-vault-purple hover:bg-vault-purple/80 text-white rounded-lg transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;
