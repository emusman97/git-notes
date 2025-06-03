import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../selectors';

export const useSelectIsAuthenticated = () =>
  useSelector(selectIsAuthenticated);
