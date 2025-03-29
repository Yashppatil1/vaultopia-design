
import { FileLock, FolderLock, Key } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type CategoryType = "notes" | "passwords" | "documents";

interface CategoryButtonProps {
  type: CategoryType;
  count?: number;
  className?: string;
}

const CategoryButton = ({ type, count = 0, className }: CategoryButtonProps) => {
  const getIcon = () => {
    switch (type) {
      case "notes":
        return <FileLock className="h-6 w-6 text-vault-purple" />;
      case "passwords":
        return <Key className="h-6 w-6 text-vault-purple" />;
      case "documents":
        return <FolderLock className="h-6 w-6 text-vault-purple" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "notes":
        return "Secure Notes";
      case "passwords":
        return "Passwords";
      case "documents":
        return "Documents";
    }
  };

  const getPath = () => {
    switch (type) {
      case "notes":
        return "/notes";
      case "passwords":
        return "/passwords";
      case "documents":
        return "/documents";
    }
  };

  return (
    <Link
      to={getPath()}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all",
        className
      )}
    >
      <div className="rounded-full bg-vault-purple/10 p-3 mb-2">
        {getIcon()}
      </div>
      <h3 className="font-medium text-foreground">{getTitle()}</h3>
      <p className="text-xs text-muted-foreground">{count} items</p>
    </Link>
  );
};

export default CategoryButton;
