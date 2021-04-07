import { useQuery } from 'react-query';
import { fetcher } from '../API/fetcher/fetcher';
import { useAppSelector } from './reduxHooks';

const useEconomies = (productID: number, offerID: number) => {
  const { userAuthID } = useAppSelector((state) => state.user);
  const { data } = useQuery(
    'economies fetch',
    () =>
      fetcher(
        '/products/{product_id}/offers/{offer_id}/economies',
        'get',
        { authorization: userAuthID! },
        { offer_id: offerID, product_id: productID },
      ),
    {
      refetchOnWindowFocus: false,
    },
  );
  return { data };
};

export default useEconomies;
