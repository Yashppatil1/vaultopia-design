
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddButtonProps {
  onClick: () => void;
  className?: string;
}

const AddButton = ({ onClick, className }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-20 right-4 p-3 rounded-full bg-vault-purple text-white shadow-lg hover:bg-vault-purple-light transition-all animate-bounce-subtle animate-glow",
        className
      )}
    >
      <Plus className="h-6 w-6" />
    </button>
  );
};

export default AddButton;
