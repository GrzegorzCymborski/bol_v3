import { useQuery } from 'react-query';
import { Offers } from '../types';
import { fetcher } from '../utils/fetcher';
import { useAppSelector } from './reduxHooks';

const useFetchSellers = (offerUrl: string) => {
  const offerID = parseInt(offerUrl.replace(/[^0-9]/g, ''));
  const { userAuthID } = useAppSelector((state) => state.user);
  const arrWithSellers = useQuery(
    'fetch more sellers',
    () => fetcher('/products/{product_id}/offers', 'get', { authorization: userAuthID! }, { product_id: offerID }),
    {
      refetchOnWindowFocus: false,
    },
  );
  const newArr = { ...arrWithSellers.data };
  delete newArr?.statusCode;
  const arrWithOffers = Object.entries(newArr).map((e) => e[1]) as Offers[];

  return { arrWithOffers };
};

export default useFetchSellers;
