export interface GistUser {
  id?: string;
  email?: string;
  login?: string;
  avatar_url?: string;
}

export interface GistFile {
  filename?: string;
  type?: string;
  language?: string;
  raw_url?: string;
  size?: number;
  encoding?: string;
}
export interface Gist {
  id?: string;
  description?: string;
  public?: boolean;
  url?: string;
  truncated?: boolean;
  owner?: GistUser;
  user?: GistUser;
  created_at?: string;
  updated_at?: string;
  files: Record<string, GistFile>;
}

export type Gists = Gist[];

export type GistFiles = NonNullable<Gist['files']>;
export type GistId = NonNullable<Gist['id']>;
