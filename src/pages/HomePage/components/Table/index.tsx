import { GistForkStarIconGroup, Pagination } from '@/components';
import { AppStrings } from '@/constants';
import type { Gist, GistUser } from '@/models';
import { getFilename, getInitials, makeItemKey, timeAgo } from '@/utils';
import {
  Avatar,
  Chip,
  Table as MUITable,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import type { JSX } from 'react';
import { StyledTableCell } from './StyledTableCell';
import type { TableProps } from './types';

export function Table({
  data,
  paginationProps,
  onGistClick,
  ...restProps
}: TableProps): JSX.Element {
  const handleGistClick = (gist: Gist) => () => {
    onGistClick?.(gist);
  };

  const renderUserInfo = (user?: GistUser) => (
    <Stack flexDirection="row" alignItems="center" gap={1}>
      <Avatar src={user?.avatar_url}>{getInitials(user?.login ?? '')}</Avatar>
      <Typography>{user?.login}</Typography>
    </Stack>
  );

  return (
    <Stack {...restProps}>
      <TableContainer component={Paper}>
        <MUITable>
          <TableHead>
            <TableRow>
              <StyledTableCell>{AppStrings.Name}</StyledTableCell>
              <StyledTableCell>{AppStrings.NotebookName}</StyledTableCell>
              <StyledTableCell>{AppStrings.Keyword}</StyledTableCell>
              <StyledTableCell>{AppStrings.Updated}</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                id={makeItemKey(row.id ?? '', index)}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={handleGistClick(row)}
              >
                <TableCell>{renderUserInfo(row.user ?? row.owner)}</TableCell>
                <TableCell>{getFilename(row.files ?? {})}</TableCell>
                <TableCell>
                  <Chip color="primary" label={AppStrings.Keyword} />
                </TableCell>
                <TableCell>
                  {AppStrings.UpdatedAt} {timeAgo(row.updated_at ?? '')}
                </TableCell>
                <TableCell>
                  <GistForkStarIconGroup justifyContent="flex-end" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <StyledTableCell colSpan={6} padding={'none'}>
                <Stack
                  flex={1}
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  mt={1}
                  mb={1}
                  mr={2}
                >
                  <Pagination {...paginationProps} />
                </Stack>
              </StyledTableCell>
            </TableRow>
          </TableFooter>
        </MUITable>
      </TableContainer>
    </Stack>
  );
}
