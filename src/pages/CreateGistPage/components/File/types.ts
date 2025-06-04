import type { Callback } from '@/types';
import type { FieldError } from 'react-hook-form';
import type { UploadFile } from '../../types';

export interface FileProps {
  data: UploadFile;
  fieldError?: FieldError;
  onDeleteClick: Callback;
  onContentLoad: (content: string) => void;
}
