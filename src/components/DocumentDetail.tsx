
import { useState, useRef } from "react";
import { ArrowLeft, Download, Save, Trash, Upload, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  title: string;
  description?: string;
  type: string;
  size?: string;
  date: string;
  file?: File;
}

interface DocumentDetailProps {
  document: Document;
  onClose: () => void;
  onSave?: (updatedDocument: Document) => void;
  onDelete?: () => void;
}

const DocumentDetail = ({ document, onClose, onSave, onDelete }: DocumentDetailProps) => {
  const [editedDocument, setEditedDocument] = useState<Document>({ ...document });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSave = () => {
    if (onSave) {
      onSave(editedDocument);
    } else {
      toast({
        title: "Document saved",
        description: "Your document has been saved successfully.",
      });
      onClose();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else {
      toast({
        title: "Document deleted",
        description: "Your document has been deleted.",
        variant: "destructive",
      });
      onClose();
    }
  };

  const handleDownload = () => {
    if (previewUrl) {
      const link = document.createElement('a');
      link.href = previewUrl;
      link.download = editedDocument.title || 'document';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    toast({
      title: "Document downloaded",
      description: "Your document has been downloaded.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Generate preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Update document details
    setEditedDocument({
      ...editedDocument,
      title: file.name.split('.')[0] || 'New Document',
      type: file.type || 'application/pdf',
      size: `${(file.size / 1024).toFixed(1)} KB`,
      file: file
    });

    toast({
      title: "File uploaded",
      description: "Your file has been uploaded successfully.",
    });
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
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
          {previewUrl && (
            <button
              onClick={handleDownload}
              className="p-2 rounded-full bg-secondary/50 text-muted-foreground"
            >
              <Download className="h-5 w-5" />
            </button>
          )}
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

        {/* File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileUpload} 
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
        />

        {/* Document Preview */}
        <div className="bg-white/5 rounded-lg border border-white/10 p-6 h-64 flex flex-col items-center justify-center">
          {previewUrl ? (
            <div className="flex flex-col items-center w-full h-full">
              {editedDocument.type?.includes('image') ? (
                <img 
                  src={previewUrl} 
                  alt={editedDocument.title} 
                  className="max-w-full max-h-40 object-contain mb-2"
                />
              ) : (
                <div className="rounded-full bg-vault-purple/10 p-3 mb-3">
                  <File className="h-6 w-6 text-vault-purple" />
                </div>
              )}
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
          ) : (
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-vault-purple/10 p-3 mb-3">
                <Upload className="h-6 w-6 text-vault-purple" />
              </div>
              <p className="text-center font-medium">Upload a document</p>
              <p className="text-xs text-muted-foreground mt-1 mb-4">PDF, DOCX, TXT, JPG, PNG</p>
              <button 
                onClick={triggerFileUpload}
                className="px-4 py-2 bg-vault-purple/20 text-vault-purple rounded-md text-sm flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Choose File
              </button>
            </div>
          )}
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
