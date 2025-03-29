
import { File, FileLock, FolderLock, Key } from "lucide-react";
import { cn } from "@/lib/utils";

type ItemType = "note" | "password" | "document";

interface ItemCardProps {
  title: string;
  description?: string;
  type: ItemType;
  date?: string;
  onClick?: () => void;
  className?: string;
}

const ItemCard = ({
  title,
  description,
  type,
  date,
  onClick,
  className,
}: ItemCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "note":
        return <FileLock className="h-5 w-5 text-vault-purple" />;
      case "password":
        return <Key className="h-5 w-5 text-vault-purple" />;
      case "document":
        return <FolderLock className="h-5 w-5 text-vault-purple" />;
      default:
        return <File className="h-5 w-5 text-vault-purple" />;
    }
  };

  return (
    <div
      className={cn(
        "relative p-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-all cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-vault-purple/10 p-2">{getIcon()}</div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {description}
            </p>
          )}
        </div>
      </div>
      {date && (
        <div className="text-xs text-muted-foreground mt-2">
          Last modified: {date}
        </div>
      )}
    </div>
  );
};

export default ItemCard;
