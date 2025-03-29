
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SearchBar from "@/components/SearchBar";
import ItemCard from "@/components/ItemCard";
import AddButton from "@/components/AddButton";
import BottomNavigation from "@/components/BottomNavigation";
import DocumentDetail from "@/components/DocumentDetail";

interface Document {
  id: string;
  title: string;
  description?: string;
  type: string;
  size?: string;
  date: string;
  file?: File;
}

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "Tax Documents",
      description: "2023 tax filings",
      type: "PDF",
      size: "2.4 MB",
      date: "May 10, 2023",
    },
    {
      id: "2",
      title: "Medical Records",
      description: "Annual health checkup",
      type: "PDF",
      size: "1.8 MB",
      date: "April 5, 2023",
    },
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddNew = () => {
    const newDocument: Document = {
      id: Date.now().toString(),
      title: "New Document",
      description: "Click to add description",
      type: "Unknown",
      size: "0 KB",
      date: new Date().toLocaleString(),
    };
    
    setSelectedDocument(newDocument);
  };

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleCloseDetail = () => {
    setSelectedDocument(null);
  };

  const handleSaveDocument = (updatedDocument: Document) => {
    const documentIndex = documents.findIndex(doc => doc.id === updatedDocument.id);
    
    if (documentIndex >= 0) {
      // Update existing document
      const updatedDocuments = [...documents];
      updatedDocuments[documentIndex] = updatedDocument;
      setDocuments(updatedDocuments);
    } else {
      // Add new document
      setDocuments([updatedDocument, ...documents]);
    }
    
    toast({
      title: "Document saved",
      description: "Your document has been saved successfully.",
    });
    setSelectedDocument(null);
  };

  const handleDeleteDocument = () => {
    if (selectedDocument) {
      setDocuments(documents.filter(doc => doc.id !== selectedDocument.id));
      
      toast({
        title: "Document deleted",
        description: "Your document has been deleted.",
        variant: "destructive",
      });
      setSelectedDocument(null);
    }
  };

  const filteredDocuments = documents.filter(
    (document) =>
      document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (document.description &&
        document.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (selectedDocument) {
    return (
      <DocumentDetail 
        document={selectedDocument} 
        onClose={handleCloseDetail} 
        onSave={handleSaveDocument}
        onDelete={handleDeleteDocument}
      />
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Secure Documents</h1>
        <button 
          onClick={() => navigate("/settings")}
          className="p-2 rounded-full bg-secondary/50"
        >
          <Settings className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mb-6">
        <SearchBar onSearch={handleSearch} placeholder="Search your documents..." />
      </div>

      {/* Documents List */}
      <div className="px-4 mb-6">
        <div className="space-y-3">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((document) => (
              <ItemCard
                key={document.id}
                title={document.title}
                description={document.description}
                type="document"
                date={document.date}
                onClick={() => handleDocumentClick(document)}
              />
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              {searchQuery
                ? "No documents match your search"
                : "No documents to display"}
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

export default Documents;
