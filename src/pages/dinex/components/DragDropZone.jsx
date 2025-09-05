import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

export const DragDropZone = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'].includes(file.type)
    );
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 bg-gray-900 relative flex flex-col items-center transition duration-100 ease-linear">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
          transition-all duration-200 ease-in-out
          ${isDragOver 
            ? 'border-blue-400 bg-blue-950/30' 
            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".svg,.png,.jpg,.jpeg"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`
            p-3 rounded-lg transition-colors
            ${isDragOver ? 'bg-blue-600' : 'bg-gray-700'}
          `}>
            <Upload className="w-6 h-6 text-white" />
          </div>
          
          <div>
            <p className="text-white text-lg font-medium mb-2">
              <span className="text-blue-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-gray-400 text-sm">
              SVG, PNG or JPG (max. 800×400px)
            </p>
          </div>
        </div>

        {isDragOver && (
          <div className="absolute inset-0 rounded-lg bg-blue-600/10 border-2 border-blue-400 flex items-center justify-center">
            <p className="text-blue-400 font-medium">Drop files here</p>
          </div>
        )}
      </div>

      {/* Mostrar archivos seleccionados */}
      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-white font-medium mb-3">Selected files:</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <Upload className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{file.name}</p>
                  <p className="text-gray-400 text-xs">
                    {(file.size / 1024).toFixed(1)} KB • {file.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DragDropZone;