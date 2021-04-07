import useFetchSellers from '../../hooks/useFetchSellers';
import Sellers from '../sellers/Sellers';

type ExpandedRowProps = {
  offerUrl: string;
};

const ExpandedRow = ({ offerUrl }: ExpandedRowProps) => {
  const { arrWithOffers } = useFetchSellers(offerUrl);

  return <Sellers xs="6" md="4" offers={arrWithOffers} />;
};

export default ExpandedRow;
