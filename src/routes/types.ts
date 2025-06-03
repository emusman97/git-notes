import type { Gist } from '@/models';

export interface ViewGistsState {
  data: Gist;
  myGist?: boolean;
}
