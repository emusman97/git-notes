import { useSelector } from 'react-redux';
import { selectLoading } from '../selectors';

export const useSelectLoading = () => useSelector(selectLoading);
