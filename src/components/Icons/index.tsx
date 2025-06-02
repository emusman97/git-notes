import SearchIcon from '@mui/icons-material/Search';
import TableIcon from '@mui/icons-material/FormatListBulletedSharp';
import GridIcon from '@mui/icons-material/Subject';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { GistForkIcon } from './GistForkIcon';

export const Icons = {
  Search: SearchIcon,
  Table: TableIcon,
  Grid: GridIcon,
  ArrowLeft: ChevronLeftIcon,
  ArrowRight: ChevronRightIcon,
  Star: StarBorderOutlinedIcon,
  GistFork: GistForkIcon,
  Delete: DeleteIcon,
} as const;
