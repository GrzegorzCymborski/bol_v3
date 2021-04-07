import { CLink } from '@coreui/react';
import useCarts from '../../hooks/useCarts';
import useEconomies from '../../hooks/useEconomies';
import { definitions } from '../../types/swagger-types';

const SellerCharts = ({ _links, offer_url }: definitions['Offer']) => {
  const selfArr = _links.self!.split('/');
  const productID = parseInt(selfArr[2]);
  const offerID = parseInt(selfArr[4]);

  const { data: economiesData } = useEconomies(productID, offerID);
  const { data: cartsData } = useCarts(productID, offerID);

  economiesData ? console.log('economiesData', economiesData) : null;
  cartsData ? console.log('cartsData', cartsData) : null;

  return (
    <>
      <p> {_links.self}</p>
      <CLink className="btn" href={`https://bol.com${offer_url}`} target="_blank" rel="noopener noreferrer">
        Offer Link
      </CLink>
    </>
  );
};

export default SellerCharts;
