import { CCol, CCardBody, CCardHeader, CLink } from '@coreui/react';
import { Offers } from '../../types';

type SellerProps = {
  offers: Offers[] | undefined;
  xs?: string;
  md?: string;
};

const Sellers = ({ offers, xs, md }: SellerProps) => {
  return (
    <CCol xs={xs} md={md}>
      <CCardBody>
        <CCardHeader>Sellers:</CCardHeader>
        <CCardBody>
          {offers?.map(({ offer_url, seller }) => (
            <div key={offer_url}>
              <CLink className="btn" href={`https://bol.com${offer_url}`} target="_blank" rel="noopener noreferrer">
                {seller}
              </CLink>
            </div>
          ))}
        </CCardBody>
      </CCardBody>
    </CCol>
  );
};

export default Sellers;
