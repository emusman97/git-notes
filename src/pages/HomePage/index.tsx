import {
  GistsGrid,
  Icons,
  MainLayout,
  PageHeadingContainer,
} from '@/components';
import { AppStrings } from '@/constants';
import { useGists, useSearchQuery } from '@/hooks';
import type { Gist } from '@/models';
import { RoutePaths, type ViewGistsState } from '@/routes';
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
} from '@mui/material';
import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router';
import { ListSkeleton, Table } from './components';
import { GistsLayouts, type GistsLayout } from './types';

export function HomePage(): JSX.Element {
  const navigate = useNavigate();

  const { query, handleQueryValueChange } = useSearchQuery();
  const [selectedLayout, setSelectedLayout] = useState<GistsLayout>(
    GistsLayouts.Table
  );
  const { isLoading, gistsData, paginationProps } = useGists({
    public: true,
  });

  const handleValueChange: ToggleButtonGroupProps['onChange'] = (
    _,
    newValue
  ) => {
    setSelectedLayout(newValue);
  };
  const handleGistClick = (gist: Gist) => {
    const state: ViewGistsState = { data: gist };
    navigate(RoutePaths.Gist, { state });
  };

  const renderListLayoutToggle = () => (
    <ToggleButtonGroup
      exclusive
      disabled={gistsData.length === 0}
      value={selectedLayout}
      onChange={handleValueChange}
    >
      <ToggleButton value={GistsLayouts.Grid}>
        <Icons.Grid fontSize="small" />
      </ToggleButton>
      <ToggleButton value={GistsLayouts.Table}>
        <Icons.Table fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );

  return (
    <MainLayout showSearch query={query} onQueryChange={handleQueryValueChange}>
      <PageHeadingContainer
        title={AppStrings.PublicGists}
        RightComponent={renderListLayoutToggle()}
      />

      {isLoading || gistsData.length === 0 ? (
        <ListSkeleton />
      ) : (
        gistsData.length > 0 && (
          <Stack>
            {selectedLayout === GistsLayouts.Table ? (
              <Table
                data={gistsData}
                paginationProps={paginationProps}
                onGistClick={handleGistClick}
              />
            ) : (
              <GistsGrid
                data={gistsData}
                gridContainerProps={{ spacing: { xs: 12, sm: 4 } }}
                gridItemProps={{ size: 4 }}
                gistCardProps={{ sx: { height: '100%' } }}
                paginationProps={paginationProps}
                onGistClick={handleGistClick}
              />
            )}
          </Stack>
        )
      )}
    </MainLayout>
  );
}
