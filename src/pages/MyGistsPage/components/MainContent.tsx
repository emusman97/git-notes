import { GistsGrid } from '@/components';
import { AppStrings } from '@/constants';
import { useGists } from '@/hooks';
import type { Gist } from '@/models';
import { RoutePaths, type ViewGistsState } from '@/routes';
import { Typography } from '@mui/material';
import type { JSX } from 'react';
import { useNavigate } from 'react-router';
import { LoadingSkeleton } from './LoadingSkeleton';

export function MainContent(): JSX.Element {
  const navigate = useNavigate();

  const { isLoading, isFetching, noData, gistsData, paginationProps } =
    useGists({});

  const handleGistClick = (gist: Gist) => {
    const state: ViewGistsState = { data: gist, myGist: true };
    navigate(RoutePaths.Gist, { state });
  };

  if (noData) {
    return <Typography variant="h3">{AppStrings.NoGistsAvailable}</Typography>;
  } else if (isLoading || isFetching) {
    return <LoadingSkeleton />;
  }

  return (
    <GistsGrid
      gridContainerProps={{ spacing: 2 }}
      gridItemProps={{ size: 12 }}
      gistCardProps={{ sx: { height: '100%' } }}
      data={gistsData}
      paginationProps={paginationProps}
      onGistClick={handleGistClick}
    />
  );
}
