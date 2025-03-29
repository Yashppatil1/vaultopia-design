
import { useState } from "react";
import { ArrowLeft, Copy, Eye, EyeOff, Save, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Password {
  id: string;
  title: string;
  username?: string;
  password: string;
  url?: string;
  date: string;
}

interface PasswordDetailProps {
  password: Password;
  onClose: () => void;
  onSave: (updatedPassword: Password) => void;
  onDelete: () => void;
}

const PasswordDetail = ({ password, onClose, onSave, onDelete }: PasswordDetailProps) => {
  const [editedPassword, setEditedPassword] = useState<Password>({ ...password });
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onSave(editedPassword);
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${fieldName} copied`,
      description: `${fieldName} has been copied to clipboard.`,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-secondary/50"
        >
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="p-2 rounded-full bg-vault-purple/20 text-vault-purple"
          >
            <Save className="h-5 w-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-full bg-destructive/20 text-destructive"
          >
            <Trash className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Title */}
      <input
        type="text"
        value={editedPassword.title}
        onChange={(e) =>
          setEditedPassword({ ...editedPassword, title: e.target.value })
        }
        className="w-full text-xl font-bold mb-4 bg-transparent border-none focus:outline-none focus:ring-0"
      />

      {/* Form */}
      <div className="space-y-4">
        {/* Username */}
        <div className="relative">
          <label className="text-sm text-muted-foreground mb-1 block">Username</label>
          <div className="flex">
            <input
              type="text"
              value={editedPassword.username || ""}
              onChange={(e) =>
                setEditedPassword({ ...editedPassword, username: e.target.value })
              }
              className="flex-1 p-2 bg-white/5 rounded-l-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-vault-purple"
            />
            <button
              onClick={() => copyToClipboard(editedPassword.username || "", "Username")}
              className="px-3 py-2 bg-white/5 border border-l-0 border-white/10 rounded-r-lg"
            >
              <Copy className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="relative">
          <label className="text-sm text-muted-foreground mb-1 block">Password</label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              value={editedPassword.password}
              onChange={(e) =>
                setEditedPassword({ ...editedPassword, password: e.target.value })
              }
              className="flex-1 p-2 bg-white/5 rounded-l-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-vault-purple"
            />
            <button
              onClick={togglePasswordVisibility}
              className="px-3 py-2 bg-white/5 border border-l-0 border-white/10"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            <button
              onClick={() => copyToClipboard(editedPassword.password, "Password")}
              className="px-3 py-2 bg-white/5 border border-l-0 border-white/10 rounded-r-lg"
            >
              <Copy className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* URL */}
        <div className="relative">
          <label className="text-sm text-muted-foreground mb-1 block">Website URL</label>
          <div className="flex">
            <input
              type="text"
              value={editedPassword.url || ""}
              onChange={(e) =>
                setEditedPassword({ ...editedPassword, url: e.target.value })
              }
              className="flex-1 p-2 bg-white/5 rounded-l-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-vault-purple"
            />
            <button
              onClick={() => copyToClipboard(editedPassword.url || "", "URL")}
              className="px-3 py-2 bg-white/5 border border-l-0 border-white/10 rounded-r-lg"
            >
              <Copy className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Last modified */}
      <div className="text-xs text-muted-foreground mt-auto pt-4">
        Last modified: {editedPassword.date}
      </div>
    </div>
  );
};

export default PasswordDetail;
