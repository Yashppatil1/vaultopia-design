
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SearchBar from "@/components/SearchBar";
import ItemCard from "@/components/ItemCard";
import AddButton from "@/components/AddButton";
import BottomNavigation from "@/components/BottomNavigation";
import NoteDetail from "@/components/NoteDetail";

interface Note {
  id: string;
  title: string;
  description?: string;
  content: string;
  date: string;
}

const Notes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Work Notes",
      description: "Meeting notes and project ideas",
      content: "- Discuss new project timeline\n- Prepare presentation for client\n- Follow up with engineering team",
      date: "Today, 2:30 PM",
    },
    {
      id: "2",
      title: "Personal Goals",
      description: "Goals for the next quarter",
      content: "1. Run 5k three times a week\n2. Read one book per month\n3. Practice meditation daily",
      date: "Yesterday",
    },
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddNew = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      description: "Click to edit this note",
      content: "Add your secure content here...",
      date: new Date().toLocaleString(),
    };
    
    setNotes([newNote, ...notes]);
    setShowAddOptions(false);
    toast({
      title: "Note created",
      description: "Your secure note has been created successfully.",
    });
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleCloseDetail = () => {
    setSelectedNote(null);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.description &&
        note.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (selectedNote) {
    return <NoteDetail note={selectedNote} onClose={handleCloseDetail} />;
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Secure Notes</h1>
        <button 
          onClick={() => navigate("/settings")}
          className="p-2 rounded-full bg-secondary/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mb-6">
        <SearchBar onSearch={handleSearch} placeholder="Search your notes..." />
      </div>

      {/* Notes List */}
      <div className="px-4 mb-6">
        <div className="space-y-3">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <ItemCard
                key={note.id}
                title={note.title}
                description={note.description}
                type="note"
                date={note.date}
                onClick={() => handleNoteClick(note)}
              />
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              {searchQuery
                ? "No notes match your search"
                : "No notes to display"}
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

export default Notes;
