import { logout } from '../redux/user';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { auth } from '../firebase/firebase';

const useUserData = () => {
  const { firebaseData } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const logoutUser = () => {
    auth.signOut();
    dispatch(logout());
  };

  return { firebaseData, logoutUser };
};

export default useUserData;
