import { useQuery } from 'react-query';
import { fetcher } from '../utils/fetcher';
import { useAppSelector } from './reduxHooks';

const useStats = () => {
  const { userAuthID } = useAppSelector((state) => state.user);
  const { data, isError, isLoading } = useQuery(
    'stats fetch',
    () => fetcher('/statistics', 'get', { authorization: userAuthID! }),
    {
      refetchOnWindowFocus: false,
    },
  );
  return { data, isError, isLoading };
};

export default useStats;
