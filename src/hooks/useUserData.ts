import { logout } from '../redux/user';
import { useAppDispatch, useAppSelector } from './reduxHooks';

const useUserData = () => {
  const { firebaseData } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const logoutUser = () => dispatch(logout());

  return { firebaseData, logoutUser };
};

export default useUserData;
