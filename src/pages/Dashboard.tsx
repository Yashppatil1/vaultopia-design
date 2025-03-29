
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SearchBar from "@/components/SearchBar";
import CategoryButton from "@/components/CategoryButton";
import ItemCard from "@/components/ItemCard";
import AddButton from "@/components/AddButton";
import BottomNavigation from "@/components/BottomNavigation";

interface RecentItem {
  id: string;
  title: string;
  description?: string;
  type: "note" | "password" | "document";
  date: string;
}

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data
  const recentItems: RecentItem[] = [
    {
      id: "1",
      title: "Work Notes",
      description: "Meeting notes and project ideas",
      type: "note",
      date: "Today, 2:30 PM",
    },
    {
      id: "2",
      title: "Banking Password",
      type: "password",
      date: "Yesterday",
    },
    {
      id: "3",
      title: "Tax Documents",
      description: "2023 tax filings",
      type: "document",
      date: "May 10, 2023",
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleItemClick = (item: RecentItem) => {
    navigate(`/${item.type}s/${item.id}`);
  };

  const filteredItems = recentItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Secure Vault</h1>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full bg-secondary/50">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </button>
          <button 
            className="p-2 rounded-full bg-secondary/50"
            onClick={() => navigate("/settings")}
          >
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-6">
        <SearchBar onSearch={handleSearch} placeholder="Search your vault..." />
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-medium mb-3">Categories</h2>
        <div className="grid grid-cols-3 gap-3">
          <CategoryButton type="notes" count={5} />
          <CategoryButton type="passwords" count={12} />
          <CategoryButton type="documents" count={3} />
        </div>
      </div>

      {/* Recent Items */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-medium mb-3">Recent Items</h2>
        <div className="space-y-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                title={item.title}
                description={item.description}
                type={item.type}
                date={item.date}
                onClick={() => handleItemClick(item)}
              />
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              {searchQuery
                ? "No items match your search"
                : "No recent items to display"}
            </div>
          )}
        </div>
      </div>

      {/* Add Button */}
      <AddButton 
        onClick={() => navigate("/notes")} 
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
