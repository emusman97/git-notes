export interface UploadFile {
  content: string | null;
  file: File;
}
export type UploadFiles = UploadFile[];

export interface FormFields {
  description: string;
  files: UploadFiles;
}
