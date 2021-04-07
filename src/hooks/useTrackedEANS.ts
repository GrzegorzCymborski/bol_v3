import { useQuery } from 'react-query';
import { fetcher } from '../API/fetcher/fetcher';
import { useAppSelector } from './reduxHooks';

const useTrackedEANS = () => {
  const { userAuthID } = useAppSelector((state) => state.user);
  const eansQuery = useQuery('tracked eans', () => fetcher('/carts/raw', 'get', { authorization: userAuthID! }));
  const { data: trackedEANsArr, refetch: refetchEANS } = eansQuery;
  return { trackedEANsArr, refetchEANS };
};

export default useTrackedEANS;
