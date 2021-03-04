import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

const SearchPage: React.FC = () => {
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Search module</CCardHeader>
          <CCardBody>
            <h6>here comes the search module</h6>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default SearchPage;
