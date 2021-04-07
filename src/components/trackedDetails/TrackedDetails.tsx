import { CCard, CCardHeader, CCardBody, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react';
import { useEffect } from 'react';
import useFetchSellers from '../../hooks/useFetchSellers';
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
  const { arrWithOffers, refetch } = useFetchSellers(_links!.offers!);

  useEffect(() => {
    refetch();
  }, [name, refetch]);

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
          {arrWithOffers.map(({ seller }, index) => (
            <CNavItem key={index}>
              <CNavLink>{seller}</CNavLink>
            </CNavItem>
          ))}
        </CNav>
        <CTabContent className="mx-4 my-4">
          {arrWithOffers.map((props, index) => (
            <CTabPane key={index}>
              <SellerCharts {...props} />
            </CTabPane>
          ))}
        </CTabContent>
      </CTabs>
    </CCard>
  );
};

export default TrackedDetails;
