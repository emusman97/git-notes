import { useSelector } from 'react-redux';
import { selectUserInfo } from '../selectors';

export const useSelectUserInfo = () => useSelector(selectUserInfo);
