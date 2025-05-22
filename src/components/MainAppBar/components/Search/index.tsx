import { Icons } from '@/components';
import { AppStrings } from '@/constants';
import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ChangeEventHandler, JSX } from 'react';
import type { SearchProps } from './types';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.custom.searchBorder.light}`,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  '&:has(input:focus)': {
    borderColor: theme.custom.searchBorder.dark,
  },
  '&:has(input:focus) .MuiSvgIcon-root': {
    fill: theme.custom.searchBorder.dark,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiSvgIcon-root': {
    fill: theme.custom.searchBorder.light,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export function Search({ value, onValueChange }: SearchProps): JSX.Element {
  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onValueChange?.(event.target.value);
  };

  return (
    <SearchContainer>
      <SearchIconWrapper>
        <Icons.Search />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={AppStrings.SearchGists}
        value={value}
        onChange={handleValueChange}
      />
    </SearchContainer>
  );
}
