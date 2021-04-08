import { CCard, CCardHeader, CCardBody, CNav, CNavItem, CNavLink, CTabs, CTabContent, CTabPane } from '@coreui/react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import useFetchSellers from '../../hooks/useFetchSellers';
import { setProductAndOfferIDS } from '../../redux/trackedSeller';
import { definitions } from '../../types/swagger-types';
import SellerCharts from '../sellerCharts/SellerCharts';

const TrackedDetails = ({
  name,
  brand,
  category,
  dimensions,
  ean,
  price,
  rating,
  subcategory,
  weight,
  _links,
  product_img,
}: definitions['Product']) => {
  const dispatch = useAppDispatch();

  const { arrWithOffers, refetch } = useFetchSellers(_links!.offers!);
  const { offerURL } = useAppSelector((state) => state.trackedSeller);

  useEffect(() => {
    refetch();
  }, [name, refetch]);

  const handleTrackedProduct = (links: string, offer_url: string) => {
    const selfArr = links.split('/');
    const productID = parseInt(selfArr[2]);
    const offerID = parseInt(selfArr[4]);
    const trackedProduct = { productID, offerID, offer_url: `https://bol.com${offer_url}` };
    dispatch(setProductAndOfferIDS(trackedProduct));
  };

  return (
    <CCard>
      <CCardHeader>{name}</CCardHeader>
      <CCardBody className="d-flex justify-content-between mb-5" style={{ height: '300px' }}>
        <div>
          <p>brand: {brand}</p>
          <p>category: {category}</p>
          <p>dimensions: {dimensions}</p>
          <p>ean: {ean}</p>
          <p>price: {price}</p>
          <p>rating: {rating}</p>
          <p>subcategory: {subcategory}</p>
          <p>weight: {weight}</p>
        </div>
        <div style={{ background: `right / contain no-repeat url(${product_img})`, height: '100%', width: '40%' }} />
      </CCardBody>

      <CTabs>
        <CNav variant="tabs">
          {arrWithOffers.map(({ seller, _links, offer_url }, index) => (
            <CNavItem key={index}>
              <CNavLink data-tab={index} onClick={() => handleTrackedProduct(_links.self!, offer_url)}>
                {seller}
              </CNavLink>
            </CNavItem>
          ))}
        </CNav>
        {offerURL && (
          <CTabContent className="mx-4 my-4">
            {arrWithOffers.map((props, index) => (
              <CTabPane key={index} data-tab={index}>
                <SellerCharts />
              </CTabPane>
            ))}
          </CTabContent>
        )}
      </CTabs>
    </CCard>
  );
};

export default TrackedDetails;
