export interface GistUser {
  id?: string;
  name?: string;
  email?: string;
  login?: string;
  avatar_url?: string;
}

export interface Gist {
  id?: string;
  descriptiom?: string;
  public?: boolean;
  url?: string;
  truncated?: boolean;
  owner?: GistUser;
  user?: GistUser;
  created_at?: string;
  updated_at?: string;
}

export type Gists = Gist[];
