import { Icons, MainLayout, PageHeadingContainer } from '@/components';
import { AppStrings } from '@/constants';
import {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
} from '@mui/material';
import { useState, type JSX } from 'react';
import { GistsLayouts, type GistsLayout } from './types';

export function HomePage(): JSX.Element {
  const [selectedLayout, setSelectedLayout] = useState<GistsLayout>(
    GistsLayouts.Table
  );

  const handleValueChange: ToggleButtonGroupProps['onChange'] = (
    _,
    newValue
  ) => {
    setSelectedLayout(newValue);
  };

  const renderListLayoutToggle = () => (
    <ToggleButtonGroup
      exclusive
      value={selectedLayout}
      onChange={handleValueChange}
    >
      <ToggleButton value={GistsLayouts.Grid}>
        <Icons.Grid />
      </ToggleButton>
      <ToggleButton value={GistsLayouts.Table}>
        <Icons.Table />
      </ToggleButton>
    </ToggleButtonGroup>
  );

  return (
    <MainLayout>
      <PageHeadingContainer
        title={AppStrings.PublicGists}
        RightComponent={renderListLayoutToggle()}
      />
      <h1>Put table here</h1>
    </MainLayout>
  );
}
