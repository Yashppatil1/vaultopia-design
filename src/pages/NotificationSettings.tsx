
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, ShieldAlert, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const NotificationSettings = () => {
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [passwordExpiryReminders, setPasswordExpiryReminders] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(true);
  const [dataBackupReminders, setDataBackupReminders] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSaveChanges = () => {
    // In a real app, we would call an API to update settings
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated",
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
        <h1 className="text-xl font-bold">Notification Settings</h1>
      </div>

      <div className="space-y-6">
        <p className="text-muted-foreground">Choose what notifications you receive from Secure Vault.</p>
        
        {/* Security Alerts */}
        <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-vault-purple/10 p-2">
              <ShieldAlert className="h-5 w-5 text-vault-purple" />
            </div>
            <div>
              <h3 className="font-medium">Security Alerts</h3>
              <p className="text-sm text-muted-foreground">Unusual activity and security threats</p>
            </div>
          </div>
          <Switch
            checked={securityAlerts}
            onCheckedChange={setSecurityAlerts}
          />
        </div>

        {/* Password Expiry Reminders */}
        <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-vault-purple/10 p-2">
              <Timer className="h-5 w-5 text-vault-purple" />
            </div>
            <div>
              <h3 className="font-medium">Password Expiry Reminders</h3>
              <p className="text-sm text-muted-foreground">Remind me when passwords need updating</p>
            </div>
          </div>
          <Switch
            checked={passwordExpiryReminders}
            onCheckedChange={setPasswordExpiryReminders}
          />
        </div>

        {/* Login Attempt Notifications */}
        <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-vault-purple/10 p-2">
              <Bell className="h-5 w-5 text-vault-purple" />
            </div>
            <div>
              <h3 className="font-medium">Login Attempt Notifications</h3>
              <p className="text-sm text-muted-foreground">Alert me of all login attempts</p>
            </div>
          </div>
          <Switch
            checked={loginAttempts}
            onCheckedChange={setLoginAttempts}
          />
        </div>

        {/* Data Backup Reminders */}
        <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-vault-purple/10 p-2">
              <Bell className="h-5 w-5 text-vault-purple" />
            </div>
            <div>
              <h3 className="font-medium">Data Backup Reminders</h3>
              <p className="text-sm text-muted-foreground">Periodic reminders to backup your data</p>
            </div>
          </div>
          <Switch
            checked={dataBackupReminders}
            onCheckedChange={setDataBackupReminders}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveChanges}
          className="w-full py-2 px-4 bg-vault-purple hover:bg-vault-purple/80 text-white rounded-lg transition-all"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
