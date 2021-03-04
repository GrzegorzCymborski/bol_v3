import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

const TrackedPage: React.FC = () => {
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
    </CRow>
  );
};

export default TrackedPage;
