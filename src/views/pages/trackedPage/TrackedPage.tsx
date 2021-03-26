import React from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CImg, CRow } from '@coreui/react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { definitions } from '../../../types/swagger-types';
import { useQuery } from 'react-query';
import { deleteEAN, trackedProductsData } from '../../../API';
import CIcon from '@coreui/icons-react';

const TrackedPage: React.FC = () => {
  const { userAuthID } = useAppSelector((state) => state.user);
  const getTrackedProducts = useQuery<definitions['GetProductsResponse']>(
    'tracked products fetch',
    () => trackedProductsData(userAuthID!, 100, 1),
    {
      refetchOnWindowFocus: false,
    },
  );
  const { data } = getTrackedProducts;
  console.log('data', data);

  const handleDeleteEAN = async (ean: number) => {
    await deleteEAN(userAuthID!, ean);
    await getTrackedProducts.refetch();
  };

  const fields = [
    { key: 'product_img', label: 'Image', _style: { width: '5%' } },
    { key: 'name', label: 'Name' },
    { key: 'ean', label: 'EAN', _style: { width: '10%' } },
    { key: 'subcategory', label: 'Subcategory', _style: { width: '10%' } },
    { key: 'price', label: 'Price', _style: { width: '5%' } },
    { key: 'rating', label: 'Rating', _style: { width: '5%' } },
    { key: 'show_details', label: 'Info', _style: { width: '1%' } },
    { key: 'delete_ean', label: 'Delete', _style: { width: '1%' } },
  ];

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Tracked module</CCardHeader>
          <CCardBody>
            <h6>here comes the tracked module</h6>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12">
        <CCard>
          <CCardBody>
            <CDataTable
              items={data === undefined || data.statusCode === 404 ? [] : data?.products}
              size="sm"
              fields={fields}
              scopedSlots={{
                product_img: ({ product_img }: definitions['Product']) => (
                  <td>
                    <CImg src={product_img} thumbnail />
                  </td>
                ),
                show_details: (item: never, index: number) => {
                  return (
                    <td>
                      <CButton size="sm">
                        <CIcon name="cilBarChart" />
                      </CButton>
                    </td>
                  );
                },
                delete_ean: (item: definitions['Product']) => {
                  return (
                    <td>
                      <CButton size="sm" onClick={() => handleDeleteEAN(item.ean)}>
                        <CIcon name="cilTrash" />
                      </CButton>
                    </td>
                  );
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default TrackedPage;
