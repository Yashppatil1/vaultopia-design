
import React, { useState, ChangeEvent } from "react";
import { ArrowLeft, Trash2, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DocumentFile {
  id: string;
  title: string;
  description?: string;
  type: string;
  size?: string;
  date: string;
  file?: File;
}

interface DocumentDetailProps {
  document: DocumentFile;
  onClose: () => void;
  onSave: (document: DocumentFile) => void;
  onDelete: () => void;
}

const DocumentDetail: React.FC<DocumentDetailProps> = ({ 
  document, 
  onClose, 
  onSave,
  onDelete
}) => {
  const [title, setTitle] = useState(document.title);
  const [description, setDescription] = useState(document.description || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create file preview
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        if (event.target?.result) {
          setPreviewUrl(event.target.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedDocument = {
      ...document,
      title,
      description,
      type: selectedFile ? selectedFile.type.split('/')[1].toUpperCase() : document.type,
      size: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : document.size,
      date: new Date().toLocaleString(),
      file: selectedFile || document.file
    };
    
    onSave(updatedDocument);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-secondary/50"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex gap-2">
          <Button 
            variant="destructive" 
            size="icon"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
      
      {/* Document Form */}
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Document Title</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter document title"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description (Optional)</label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description"
            rows={3}
          />
        </div>
        
        {/* File Upload Section */}
        <div className="border border-dashed border-input rounded-lg p-6 flex flex-col items-center justify-center">
          <div className="mb-4">
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-center text-sm text-muted-foreground">
              Drag and drop your file here or click to browse
            </p>
            <p className="text-center text-xs text-muted-foreground mt-1">
              Supports PDF, images, and documents
            </p>
          </div>
          
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            onClick={() => {
              // Correctly access the DOM element
              const fileInput = document.getElementById('file-upload');
              if (fileInput) {
                fileInput.click();
              }
            }}
          >
            Select File
          </Button>
        </div>
        
        {/* File Preview */}
        {previewUrl && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Preview:</h3>
            {selectedFile?.type.startsWith('image/') ? (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary/30 flex items-center justify-center">
                <img 
                  src={previewUrl} 
                  alt="File preview" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <Alert>
                <AlertDescription>
                  {selectedFile?.name} ({selectedFile?.type.split('/')[1].toUpperCase()} file, {(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB)
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
        
        {/* Display Existing Document Info */}
        {!previewUrl && document.size && (
          <Alert>
            <AlertDescription>
              {document.title} ({document.type} file, {document.size})
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default DocumentDetail;
