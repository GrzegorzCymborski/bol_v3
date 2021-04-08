import { CLink } from '@coreui/react';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import useEconomies from '../../hooks/useEconomies';

const SellerCharts = () => {
  const { trackedOfferID, trackedProductID, offerURL } = useAppSelector((state) => state.trackedSeller);

  const { data: economiesData, refetch } = useEconomies(trackedProductID, trackedOfferID);

  economiesData ? console.log('economiesData', economiesData) : null;

  useEffect(() => {
    refetch();
  }, [trackedOfferID, trackedProductID, offerURL, refetch]);

  return (
    <>
      <CLink className="btn" href={offerURL} target="_blank" rel="noopener noreferrer">
        Offer Link / {offerURL}
        <pre>{JSON.stringify(economiesData?.economies![1].price, undefined, 2)}</pre>
      </CLink>
    </>
  );
};

export default SellerCharts;
