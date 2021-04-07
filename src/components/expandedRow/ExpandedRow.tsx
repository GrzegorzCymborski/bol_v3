import { useQuery } from 'react-query';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Offers } from '../../types';
import { fetcher } from '../../utils/fetcher';
import Sellers from '../sellers/Sellers';

type ExpandedRowProps = {
  offerUrl: string;
};

const ExpandedRow = ({ offerUrl }: ExpandedRowProps) => {
  const { userAuthID } = useAppSelector((state) => state.user);

  const offerID = parseInt(offerUrl.replace(/[^0-9]/g, ''));

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

  return <Sellers xs="6" md="4" offers={arrWithOffers} />;
};

export default ExpandedRow;
