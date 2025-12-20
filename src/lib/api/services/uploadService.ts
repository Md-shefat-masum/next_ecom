import { api } from '../client';
import { ApiResponse } from '@/types';

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

export const uploadService = {
  uploadImage: (file: File, maxWidth?: number, maxHeight?: number) => {
    const formData = new FormData();
    formData.append('image', file);
    if (maxWidth) formData.append('max_width', maxWidth.toString());
    if (maxHeight) formData.append('max_height', maxHeight.toString());
    
    return api.post<ApiResponse<UploadedFile>>('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post<ApiResponse<UploadedFile>>('/upload/file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteFile: (fileId: number) => 
    api.delete<ApiResponse<null>>(`/upload/${fileId}`),
};

export default uploadService;

