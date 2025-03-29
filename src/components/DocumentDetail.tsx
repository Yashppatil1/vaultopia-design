
import { useState } from "react";
import { ArrowLeft, Download, Save, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  title: string;
  description?: string;
  type: string;
  size?: string;
  date: string;
}

interface DocumentDetailProps {
  document: Document;
  onClose: () => void;
}

const DocumentDetail = ({ document, onClose }: DocumentDetailProps) => {
  const [editedDocument, setEditedDocument] = useState<Document>({ ...document });
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Document saved",
      description: "Your document has been saved successfully.",
    });
    onClose();
  };

  const handleDelete = () => {
    toast({
      title: "Document deleted",
      description: "Your document has been deleted.",
      variant: "destructive",
    });
    onClose();
  };

  const handleDownload = () => {
    toast({
      title: "Document downloaded",
      description: "Your document has been downloaded.",
    });
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
            onClick={handleDownload}
            className="p-2 rounded-full bg-secondary/50 text-muted-foreground"
          >
            <Download className="h-5 w-5" />
          </button>
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

      {/* Document Information */}
      <div className="flex-1">
        <input
          type="text"
          value={editedDocument.title}
          onChange={(e) =>
            setEditedDocument({ ...editedDocument, title: e.target.value })
          }
          className="w-full text-xl font-bold mb-2 bg-transparent border-none focus:outline-none focus:ring-0"
        />

        <input
          type="text"
          value={editedDocument.description || ""}
          onChange={(e) =>
            setEditedDocument({ ...editedDocument, description: e.target.value })
          }
          placeholder="Add a description"
          className="w-full text-sm text-muted-foreground mb-4 bg-transparent border-none focus:outline-none focus:ring-0"
        />

        {/* Document Preview */}
        <div className="bg-white/5 rounded-lg border border-white/10 p-6 h-64 flex flex-col items-center justify-center">
          <div className="rounded-full bg-vault-purple/10 p-3 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-vault-purple"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <p className="text-center font-medium">{editedDocument.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{editedDocument.type} - {editedDocument.size}</p>
          <button 
            onClick={handleDownload}
            className="mt-4 px-4 py-2 bg-vault-purple/20 text-vault-purple rounded-md text-sm flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>

      {/* Last modified */}
      <div className="text-xs text-muted-foreground mt-4">
        Last modified: {editedDocument.date}
      </div>
    </div>
  );
};

export default DocumentDetail;
