import { styled, TableCell, tableCellClasses } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.custom.tableHeader?.main,
  },
  [`&.${tableCellClasses.footer}`]: {
    backgroundColor: theme.custom.tableHeader?.main,
  },
}));
