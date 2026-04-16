export interface UploadedFile {
  id: number;
  filename: string;
  original_name: string;
  path: string;
  url: string;
  mime_type: string;
  size: number;
  created_at: string;
}

export interface UploadOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export type AllowedImageTypes = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
export type AllowedFileTypes = 'application/pdf' | 'application/msword' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

