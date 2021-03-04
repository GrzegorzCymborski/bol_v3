import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

const UploadEANs: React.FC = () => {
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Upload EANs module</CCardHeader>
          <CCardBody>
            <h6>here comes the upload files module</h6>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UploadEANs;
