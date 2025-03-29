
import { File, FolderLock, Home, Key, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/dashboard",
    },
    {
      icon: File,
      label: "Notes",
      path: "/notes",
    },
    {
      icon: Key,
      label: "Passwords",
      path: "/passwords",
    },
    {
      icon: FolderLock,
      label: "Documents",
      path: "/documents",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around p-2 bg-background/80 backdrop-blur-md border-t border-white/5">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-2 rounded-md transition-all",
              isActive
                ? "text-vault-purple"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon
              className={cn(
                "h-5 w-5 mb-1",
                isActive && "animate-pulse-slow"
              )}
            />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
