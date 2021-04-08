import { useQuery } from 'react-query';
import { fetcher } from '../API/fetcher/fetcher';
import { useAppSelector } from './reduxHooks';

const useCarts = (productID: number | undefined, offerID: number | undefined) => {
  const { userAuthID } = useAppSelector((state) => state.user);
  const { data } = useQuery(
    'carts fetch',
    () =>
      fetcher(
        '/products/{product_id}/offers/{offer_id}/carts',
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

export default useCarts;
