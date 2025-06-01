interface UseOwnGistsQuery {
  public: false;
}

interface UsePublicGists {
  public: true;
  withAuth: boolean;
}

export type UseGetGistsQuery = UseOwnGistsQuery | UsePublicGists;
