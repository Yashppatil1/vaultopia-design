
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SearchBar from "@/components/SearchBar";
import ItemCard from "@/components/ItemCard";
import AddButton from "@/components/AddButton";
import BottomNavigation from "@/components/BottomNavigation";
import PasswordDetail from "@/components/PasswordDetail";

interface Password {
  id: string;
  title: string;
  username?: string;
  password: string;
  url?: string;
  date: string;
}

const Passwords = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPassword, setSelectedPassword] = useState<Password | null>(null);
  const [passwords, setPasswords] = useState<Password[]>([
    {
      id: "1",
      title: "Banking Password",
      username: "user@example.com",
      password: "••••••••••••",
      url: "bank.example.com",
      date: "Yesterday",
    },
    {
      id: "2",
      title: "Email Password",
      username: "user@example.com",
      password: "••••••••••",
      url: "mail.example.com",
      date: "May 12, 2023",
    },
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddNew = () => {
    const newPassword: Password = {
      id: Date.now().toString(),
      title: "New Password",
      username: "",
      password: "",
      date: new Date().toLocaleString(),
    };
    
    setPasswords([newPassword, ...passwords]);
    toast({
      title: "Password created",
      description: "Your secure password has been created successfully.",
    });
  };

  const handlePasswordClick = (password: Password) => {
    setSelectedPassword(password);
  };

  const handleCloseDetail = () => {
    setSelectedPassword(null);
  };

  const filteredPasswords = passwords.filter(
    (password) =>
      password.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (password.username && 
       password.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (password.url && 
       password.url.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (selectedPassword) {
    return <PasswordDetail password={selectedPassword} onClose={handleCloseDetail} />;
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Secure Passwords</h1>
        <button 
          onClick={() => navigate("/settings")}
          className="p-2 rounded-full bg-secondary/50"
        >
          <Settings className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mb-6">
        <SearchBar onSearch={handleSearch} placeholder="Search your passwords..." />
      </div>

      {/* Passwords List */}
      <div className="px-4 mb-6">
        <div className="space-y-3">
          {filteredPasswords.length > 0 ? (
            filteredPasswords.map((password) => (
              <ItemCard
                key={password.id}
                title={password.title}
                description={password.username || password.url}
                type="password"
                date={password.date}
                onClick={() => handlePasswordClick(password)}
              />
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              {searchQuery
                ? "No passwords match your search"
                : "No passwords to display"}
            </div>
          )}
        </div>
      </div>

      {/* Add Button */}
      <AddButton onClick={handleAddNew} />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Passwords;
