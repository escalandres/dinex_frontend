import { useState, useRef } from 'react';
import { Upload, CircleX } from 'lucide-react';

export const DragDropZone = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current++;
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
  e.preventDefault();
  dragCounter.current--;
  if (dragCounter.current === 0) {
    setIsDragOver(false);
  }
};


  const handleDrop = (e) => {
    e.preventDefault();
    dragCounter.current = 0;
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

  const handleRemoveFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleUploadFiles = () => {
    // Aquí iría la lógica de subida (fetch, axios, etc.)
    console.log('Subiendo archivos:', files);
  };



  return (
    <div className="p-4 relative flex flex-col items-center transition duration-100 ease-linear">
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        // onDragOver={handleDragOver}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-1 rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200 ease-in-out bg-transparent
          ${isDragOver 
            ? 'border-blue-600 bg-blue-950/30' 
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
          className="!hidden"
        />
        <div className="flex flex-col items-center space-y-4">
          <div className={`
            p-3 rounded-lg transition-colors
            ${isDragOver ? 'bg-gray-400' : 'bg-gray-700'}
          `}>
            <Upload className="w-6 h-6 text-white" />
          </div>
          
          <div>
            <p className="text-white text-lg font-medium mb-2">
              <span className="text-blue-500 hover:underline">Click to upload</span> or drag and drop
            </p>
            <p className="text-gray-400 text-sm">
              SVG, PNG or JPG (max. 800×400px)
            </p>
          </div>
        </div>

        {isDragOver && (
          <div className="absolute inset-0 bg-gray-600 rounded-lg opacity-100 z-10 flex items-center justify-center 
              pointer-events-none transition-opacity duration-200 text-white">Drop files here</div>
        )}
      </div>

      {/* Mostrar archivos seleccionados */}
      {files.length > 0 && (
  <div className="mt-6">
    <h3 className="text-white font-medium mb-3">Selected files:</h3>
    <div className="space-y-2">
      {files.map((file, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg ">
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <Upload className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">{file.name}</p>
            <p className="text-gray-400 text-xs">
              {(file.size / 1024).toFixed(1)} KB • {file.type}
            </p>
          </div>
          <button
            onClick={() => handleRemoveFile(index)}
            className="text-red-400 hover:text-red-600 text-sm font-medium"
          >
            <CircleX className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>

    <button
      onClick={handleUploadFiles}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Subir archivos
    </button>
  </div>
)}
    </div>
  );
};

export default DragDropZone;