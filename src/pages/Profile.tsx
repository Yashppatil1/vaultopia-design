
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [bio, setBio] = useState("Security enthusiast and privacy advocate");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Missing fields",
        description: "Name and email are required",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would call an API to update the profile
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
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
        <h1 className="text-xl font-bold">Profile</h1>
      </div>

      {/* Profile Photo */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full bg-vault-purple/20 flex items-center justify-center">
            <User className="w-12 h-12 text-vault-purple" />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-vault-purple rounded-full">
            <Camera className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-muted-foreground text-sm">Tap to change profile photo</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-vault-purple"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-vault-purple"
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-vault-purple resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-vault-purple hover:bg-vault-purple/80 text-white rounded-lg transition-all"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
