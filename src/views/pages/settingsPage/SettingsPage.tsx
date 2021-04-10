import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

const SettingsPage = () => {
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Settings module</CCardHeader>
          <CCardBody>
            <h6>here comes the settings page</h6>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default SettingsPage;
