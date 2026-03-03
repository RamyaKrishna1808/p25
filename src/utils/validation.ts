const ALLOWED_FILE_TYPES = {
  documents: ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
  images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp'],
  code: ['.js', '.ts', '.tsx', '.jsx', '.py', '.java', '.cpp', '.c', '.html', '.css'],
  archives: ['.zip', '.rar', '.7z', '.tar', '.gz'],
};

export const validateFile = (file: File, allowedTypes: string[] = []): { valid: boolean; error?: string } => {
  const maxSize = 50 * 1024 * 1024; // 50MB

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 50MB limit' };
  }

  if (allowedTypes.length > 0) {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      return { valid: false, error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` };
    }
  }

  return { valid: true };
};

export const getFileExtension = (filename: string): string => {
  return '.' + filename.split('.').pop()?.toLowerCase() || '';
};

export const getFileCategory = (filename: string): string => {
  const ext = getFileExtension(filename);
  for (const [category, extensions] of Object.entries(ALLOWED_FILE_TYPES)) {
    if (extensions.includes(ext)) {
      return category;
    }
  }
  return 'unknown';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
