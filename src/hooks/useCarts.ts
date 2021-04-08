import { useQuery } from 'react-query';
import { fetcher } from '../API/fetcher/fetcher';
import { useAppSelector } from './reduxHooks';

const useCarts = (productID: number, offerID: number, pageID: number) => {
  const { userAuthID } = useAppSelector((state) => state.user);
  const { data, refetch } = useQuery(
    'carts fetch',
    () =>
      fetcher(
        '/products/{product_id}/offers/{offer_id}/carts',
        'get',
        { authorization: userAuthID! },
        { offer_id: offerID, product_id: productID },
        { limit: 30, page: pageID },
      ),
    {
      refetchOnWindowFocus: false,
    },
  );
  return { data, refetch };
};

export default useCarts;
