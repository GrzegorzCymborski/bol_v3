import { useQuery } from 'react-query';
import { definitions } from '../types/swagger-types';
import { fetcher } from '../API/fetcher/fetcher';
import { useAppSelector } from './reduxHooks';

const useTracked = () => {
  const { userAuthID } = useAppSelector((state) => state.user);
  const { data, refetch } = useQuery<definitions['GetProductsResponse']>(
    'tracked products fetch',
    () => fetcher('/carts', 'get', { authorization: userAuthID! }, undefined, { limit: 100, page: 1 }),
    {
      refetchOnWindowFocus: false,
    },
  );
  return { data, refetch, userAuthID };
};

export default useTracked;
