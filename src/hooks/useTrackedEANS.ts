import { useQuery } from 'react-query';
import { fetcher } from '../API/fetcher/fetcher';
import { useAppSelector } from './reduxHooks';

const useTrackedEANS = () => {
  const { userAuthID } = useAppSelector((state) => state.user);
  const { data: trackedEANsArr, refetch: refetchEANS } = useQuery('tracked eans', () =>
    fetcher('/carts/raw', 'get', { authorization: userAuthID! }),
  );
  return { trackedEANsArr, refetchEANS };
};

export default useTrackedEANS;
