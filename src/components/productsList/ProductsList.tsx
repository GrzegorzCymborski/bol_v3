import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCol, CCollapse, CDataTable, CImg, CPagination, CRow } from '@coreui/react';
import { handleTrackEAN } from '../../API';
import { definitions } from '../../types/swagger-types';
import { productListFields } from '../../utils/tableFields';
import ExpandedRow from '../expandedRow/ExpandedRow';

type ProductsDataPropsProduct = {
  name: string;
  ean: number;
  product_img: string;
  brand: string;
  dimensions: string;
  weight: string;
  category?: string;
  subcategory: string;
  price: number;
  rating: number;
  _links: Links;
};
type ProductsDataPropsPage = {
  current: number;
  pages: number;
};
type ProductsDataProps = {
  rows: number;
  products: ProductsDataPropsProduct[];
  page: ProductsDataPropsPage;
};
type Links = {
  self?: string;
  carts?: string;
  economies?: string;
};

type ProductsListProps = {
  productsData: ProductsDataProps | undefined;
  trackedEANs: number[] | undefined;
  userAuthID: string;
  eansQuery: any;
  toggleDetails: (arg: number) => void;
  details: number[];
  setCurrentPage: (arg: number) => void;
  allowTracking: boolean | undefined;
};

const ProductsList = ({
  productsData,
  trackedEANs,
  userAuthID,
  eansQuery,
  toggleDetails,
  details,
  setCurrentPage,
  allowTracking,
}: ProductsListProps) => {
  return (
    <>
      {productsData ? (
        <CCol xs="12">
          <CCard>
            <CCardBody>
              <CDataTable
                items={productsData?.products}
                fields={productListFields}
                scopedSlots={{
                  product_img: ({ product_img }: definitions['Product']) => (
                    <td>
                      <CImg src={product_img} thumbnail />
                    </td>
                  ),
                  track: ({ ean }: definitions['Product']) => (
                    <td>
                      {trackedEANs?.includes(ean) ? (
                        <CIcon name="cilCheck" />
                      ) : !allowTracking ? (
                        <CIcon
                          name="cil-cart"
                          type="button"
                          onClick={async (e) => {
                            const target = e.target as HTMLElement;

                            target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-icon" role="img"><path fill="var(--ci-primary-color, currentColor)" d="M199.066,456l-7.379-7.514-3.94-3.9-86.2-86.2.053-.055L17.936,274.665l97.614-97.613,83.565,83.565L398.388,61.344,496,158.958,296.729,358.229,285.469,369.6ZM146.6,358.183l52.459,52.46.1-.1.054.054,52.311-52.311,11.259-11.368L450.746,158.958,398.388,106.6,199.115,305.871,115.55,222.306,63.191,274.665l83.464,83.463Z" class="ci-primary"></path></svg>`;
                            await handleTrackEAN(userAuthID, ean);
                            await eansQuery.refetch();
                          }}
                        />
                      ) : (
                        <CIcon
                          name="cil-cart"
                          type="button"
                          style={{ cursor: 'not-allowed' }}
                          onClick={() => alert('Reached max cart capacity')}
                        />
                      )}
                    </td>
                  ),
                  show_details: (item: never, index: number) => {
                    return (
                      <td className="py-2">
                        <CButton
                          size="sm"
                          onClick={() => {
                            toggleDetails(index);
                          }}
                        >
                          {details.includes(index) ? (
                            <CIcon name="cilFullscreen" />
                          ) : (
                            <CIcon name="cilFullscreenExit" />
                          )}
                        </CButton>
                      </td>
                    );
                  },
                  details: (item: definitions['Product'], index: number) => {
                    const newArr = Object.entries(item).filter(
                      (item) => !item.includes('product_img') && !item.includes('_links'),
                    );
                    return (
                      <>
                        <CCollapse show={details.includes(index)}>
                          <CRow className="mx-0">
                            <CCol sm="2" md="4">
                              <CCardBody>
                                <CImg src={item.product_img} fluidGrow height="400px" className="d-none d-md-block" />
                              </CCardBody>
                            </CCol>

                            <CCol xs="6" md="4">
                              <CCardBody>
                                <CDataTable items={newArr} header={false} hover />
                              </CCardBody>
                            </CCol>
                            {details.includes(index) && <ExpandedRow offerUrl={item._links.offers!} />}
                          </CRow>
                        </CCollapse>
                      </>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
          <CPagination
            activePage={productsData?.page?.current}
            pages={productsData?.page?.pages}
            onActivePageChange={(i: number) => setCurrentPage(i)}
            align="center"
            limit={5}
          />
        </CCol>
      ) : null}
    </>
  );
};

export default ProductsList;
