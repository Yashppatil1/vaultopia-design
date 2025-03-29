
import { useState } from "react";
import { ArrowLeft, Save, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Note {
  id: string;
  title: string;
  description?: string;
  content: string;
  date: string;
}

interface NoteDetailProps {
  note: Note;
  onClose: () => void;
  onSave?: (note: Note) => void;
  onDelete?: () => void;
}

const NoteDetail = ({ note, onClose, onSave, onDelete }: NoteDetailProps) => {
  const [editedNote, setEditedNote] = useState<Note>({ ...note });
  const { toast } = useToast();

  const handleSave = () => {
    // Update the date when saving
    const updatedNote = {
      ...editedNote,
      date: new Date().toLocaleString()
    };
    
    if (onSave) {
      onSave(updatedNote);
    } else {
      // Fallback for compatibility with existing code
      toast({
        title: "Note saved",
        description: "Your note has been saved successfully.",
      });
      onClose();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else {
      // Fallback for compatibility with existing code
      toast({
        title: "Note deleted",
        description: "Your note has been deleted.",
        variant: "destructive",
      });
      onClose();
    }
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
            onClick={handleDelete}
            className="p-2 rounded-full bg-destructive/20 text-destructive"
          >
            <Trash className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Title */}
      <input
        type="text"
        value={editedNote.title}
        onChange={(e) =>
          setEditedNote({ ...editedNote, title: e.target.value })
        }
        className="w-full text-xl font-bold mb-2 bg-transparent border-none focus:outline-none focus:ring-0"
      />

      {/* Description */}
      <input
        type="text"
        value={editedNote.description || ""}
        onChange={(e) =>
          setEditedNote({ ...editedNote, description: e.target.value })
        }
        placeholder="Add a description"
        className="w-full text-sm text-muted-foreground mb-4 bg-transparent border-none focus:outline-none focus:ring-0"
      />

      {/* Content */}
      <textarea
        value={editedNote.content}
        onChange={(e) =>
          setEditedNote({ ...editedNote, content: e.target.value })
        }
        className="flex-1 w-full p-2 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-vault-purple resize-none"
        placeholder="Add your secure content here..."
      />

      {/* Last modified */}
      <div className="text-xs text-muted-foreground mt-4">
        Last modified: {editedNote.date}
      </div>
    </div>
  );
};

export default NoteDetail;
