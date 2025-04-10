
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
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
    setSelectedNote(newNote); // Open the new note right away for editing
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

  const handleSaveNote = (updatedNote: Note) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
    setSelectedNote(null);
    toast({
      title: "Note saved",
      description: "Your note has been updated successfully.",
    });
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    setSelectedNote(null);
    toast({
      title: "Note deleted",
      description: "Your note has been deleted.",
      variant: "destructive",
    });
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (note.description &&
        note.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (selectedNote) {
    return <NoteDetail 
      note={selectedNote} 
      onClose={handleCloseDetail} 
      onSave={handleSaveNote}
      onDelete={() => handleDeleteNote(selectedNote.id)}
    />;
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
          <Settings className="h-5 w-5 text-muted-foreground" />
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
