import type { Callback } from '@/types';
import type { UploadFile } from '../../types';
import type { FieldError } from 'react-hook-form';

export interface FileProps {
  data: UploadFile;
  fieldError?: FieldError;
  onDeleteClick: Callback;
  onContentLoad: (content: string) => void;
}
