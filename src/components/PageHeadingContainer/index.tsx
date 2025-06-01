import { styled, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import type { JSX } from 'react';
import type { PageHeadingContainerProps } from './types';
import { AppStrings } from '@/constants';

const Badge = styled(Stack)(({ theme }) => ({
  minHeight: 30,
  minWidth: 30,
  borderRadius: 30 / 2,
  background: theme.palette.primary.main,
  color: theme.palette.secondary.main,
}));

export function PageHeadingContainer({
  title,
  showBadge,
  badgeValue,
  renderBadge,
  RightComponent,
  ...restProps
}: PageHeadingContainerProps): JSX.Element {
  const renderHeading = () => (
    <Typography variant="h2" fontSize={25}>
      {title}
    </Typography>
  );

  return (
    <Stack
      mb={2}
      flexDirection="row"
      justifyContent="space-between"
      {...restProps}
    >
      {showBadge ? (
        <Stack gap={1} flexDirection="row" alignItems="center">
          {renderHeading()}
          {renderBadge ? (
            renderBadge()
          ) : (
            <Badge alignItems="center" justifyContent="center">
              <Typography fontSize={12} fontWeight={700}>
                {(badgeValue ?? 0) > 99 ? AppStrings.$99Plus : badgeValue}
              </Typography>
            </Badge>
          )}
        </Stack>
      ) : (
        renderHeading()
      )}

      {RightComponent}
    </Stack>
  );
}
