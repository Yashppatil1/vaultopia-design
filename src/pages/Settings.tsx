import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Bell, 
  ChevronRight, 
  Database, 
  EyeOff, 
  Key, 
  Lock, 
  LogOut, 
  Moon,
  Shield, 
  Sun,
  User
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Settings = () => {
  const [panicMode, setPanicMode] = useState(false);
  const [autoLock, setAutoLock] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    // The navigation is handled by the auth state change listener
  };

  const handlePanicModeToggle = (enabled: boolean) => {
    setPanicMode(enabled);
    toast({
      title: enabled ? "Panic Mode Enabled" : "Panic Mode Disabled",
      description: enabled
        ? "Your data is now hidden with a decoy interface"
        : "Your actual data is now visible",
    });
  };

  const handleExportBackup = () => {
    toast({
      title: "Backup Created",
      description: "Encrypted backup has been exported",
    });
  };

  const handleThemeChange = (newTheme: "dark" | "light") => {
    setTheme(newTheme);
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} Theme Activated`,
      description: `App appearance has been updated to ${newTheme} mode`,
    });
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="p-4">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      {/* Settings Groups */}
      <div className="px-4 space-y-6">
        {/* Theme Settings */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground uppercase">
            Appearance
          </h2>
          <div className="p-3 bg-card rounded-lg border border-white/5">
            <div className="flex flex-col gap-2">
              <span className="text-sm">Theme</span>
              <ToggleGroup type="single" value={theme} className="flex justify-center">
                <ToggleGroupItem 
                  value="light" 
                  onClick={() => setTheme("light")}
                  className="flex items-center gap-2 data-[state=on]:bg-vault-purple/20 data-[state=on]:text-vault-purple"
                >
                  <Sun className="h-4 w-4" />
                  Light
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="dark" 
                  onClick={() => setTheme("dark")}
                  className="flex items-center gap-2 data-[state=on]:bg-vault-purple/20 data-[state=on]:text-vault-purple"
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground uppercase">
            Account
          </h2>
          <div className="space-y-1 rounded-lg overflow-hidden border border-white/5">
            <button
              onClick={() => navigate("/profile")}
              className="w-full flex items-center justify-between p-3 bg-card hover:bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-vault-purple" />
                <span>Profile</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            
            <button
              onClick={() => navigate("/change-password")}
              className="w-full flex items-center justify-between p-3 bg-card hover:bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-vault-purple" />
                <span>Change Password</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground uppercase">
            Security
          </h2>
          <div className="space-y-1 rounded-lg overflow-hidden border border-white/5">
            <div className="flex items-center justify-between p-3 bg-card">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-vault-purple" />
                <span>Auto-Lock</span>
              </div>
              <Switch
                checked={autoLock}
                onCheckedChange={setAutoLock}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-card">
              <div className="flex items-center gap-3">
                <EyeOff className="h-5 w-5 text-vault-purple" />
                <span>Panic Mode</span>
              </div>
              <Switch
                checked={panicMode}
                onCheckedChange={handlePanicModeToggle}
              />
            </div>

            <button
              onClick={() => navigate("/security-settings")}
              className="w-full flex items-center justify-between p-3 bg-card hover:bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-vault-purple" />
                <span>Advanced Security</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground uppercase">
            Notifications
          </h2>
          <div className="space-y-1 rounded-lg overflow-hidden border border-white/5">
            <button
              onClick={() => navigate("/notifications")}
              className="w-full flex items-center justify-between p-3 bg-card hover:bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-vault-purple" />
                <span>Notification Settings</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground uppercase">
            Data
          </h2>
          <div className="space-y-1 rounded-lg overflow-hidden border border-white/5">
            <button
              className="w-full flex items-center justify-between p-3 bg-card hover:bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-vault-purple" />
                <span>Export Encrypted Backup</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full p-3 mt-6 bg-destructive/20 text-destructive rounded-lg hover:bg-destructive/30 flex items-center justify-center gap-2"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Version */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          Secure Vault v1.0.0
        </p>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Settings;
