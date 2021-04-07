import { CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CImg, CRow } from '@coreui/react';
import { definitions } from '../../../types/swagger-types';
import { deleteEAN } from '../../../API';
import CIcon from '@coreui/icons-react';
import { trackedPageFields } from '../../../utils/tableFields';
import useTracked from '../../../hooks/useTracked';

const TrackedPage = () => {
  const { data, refetch, userAuthID } = useTracked();

  const handleDeleteEAN = async (ean: number) => {
    await deleteEAN(userAuthID!, ean);
    await refetch();
  };

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
              items={data?.products ? data.products : []}
              size="sm"
              fields={trackedPageFields}
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
