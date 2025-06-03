import { styled, TableCell, tableCellClasses } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.tableHeader?.main,
  },
  [`&.${tableCellClasses.footer}`]: {
    backgroundColor: theme.palette.tableHeader?.main,
  },
}));
