import { ButtonBase, Stack, styled, Typography } from '@mui/material';
import type { JSX } from 'react';
import type { IconContainerProps, IconNumberButtonProps } from './types';
import { Icons } from '@/components';
import { AppStrings } from '@/constants';
import { formatNumber } from '@/utils';

const Container = styled(ButtonBase)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
}));
const IconContainer = styled(Stack)<IconContainerProps>(
  ({ theme, checked }) => ({
    background: checked ? theme.palette.primary.main : undefined,
    color: checked ? theme.palette.secondary.main : undefined,
    padding: '0.3rem 0.8rem 0.3rem 0.8rem',
    borderRight: checked ? '' : `1px solid ${theme.palette.primary.main}`,
    fontSize: 14,
    fontWeight: 600,
  })
);

export function IconNumberButton({
  iconType,
  numberToShow,
  checked = false,
  ...restProps
}: IconNumberButtonProps): JSX.Element {
  const renderIcon = () =>
    iconType === 'fork' ? <Icons.GistFork fontSize="small" /> : <Icons.Star />;
  const renderText = () => (
    <Typography variant="body1">
      {iconType === 'fork' ? AppStrings.Fork : AppStrings.Star}
    </Typography>
  );

  return (
    <Container {...restProps}>
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <IconContainer
          checked={checked}
          flexDirection="row"
          alignItems="center"
          gap={1}
        >
          {renderIcon()}
          {renderText()}
        </IconContainer>
      </Stack>

      <Typography pl="0.5rem" pr="0.5rem" variant="body1">
        {formatNumber(numberToShow)}
      </Typography>
    </Container>
  );
}

export * from './types';
