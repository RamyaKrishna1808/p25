import React from 'react';
import { useToast } from '../context/ToastContext';
import { validateFile, formatFileSize } from '../utils/validation';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (files: FileList) => void;
  allowedTypes?: string[];
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  allowedTypes = [],
  maxSize = 50 * 1024 * 1024,
  multiple = false,
  disabled = false,
}) => {
  const { addToast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    let hasError = false;
    for (let i = 0; i < files.length; i++) {
      const validation = validateFile(files[i], allowedTypes);
      if (!validation.valid) {
        addToast(validation.error || 'File validation failed', 'error');
        hasError = true;
      }
    }

    if (!hasError) {
      onFileSelect(files);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        onChange={handleFileChange}
        disabled={disabled}
        style={{ display: 'none' }}
        accept={allowedTypes.length > 0 ? allowedTypes.join(',') : undefined}
      />
      <button
        className="btn btn-primary"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        style={{ width: '100%' }}
      >
        <Upload size={18} />
        Choose File{multiple ? 's' : ''}
      </button>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
        Max size: {formatFileSize(maxSize)}
        {allowedTypes.length > 0 && ` • Allowed: ${allowedTypes.join(', ')}`}
      </p>
    </div>
  );
};

export default FileUpload;
