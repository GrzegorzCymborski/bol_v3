import { CCol, CCardBody, CCardHeader, CLink } from "@coreui/react";

type Links = {
  self: string;
  carts: string;
  economies: string;
};

type Offers = {
  offer_url: string;
  seller: string;
  portal: string;
  _links: Partial<Links>;
};

type SellerProps = {
  offers: Offers[];
  xs: string;
  md: string;
};

const Sellers: React.FC<SellerProps> = ({ offers, xs, md }: SellerProps) => {
  return (
    <CCol xs={xs} md={md}>
      <CCardBody>
        <CCardHeader>Sellers:</CCardHeader>
        <CCardBody>
          {offers?.map(({ offer_url, seller }: any) => (
            <div key={offer_url}>
              <CLink
                className="btn"
                href={`https://bol.com${offer_url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
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
