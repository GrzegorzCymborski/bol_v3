import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

const Dashboard: React.FC = () => {
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Dashboard</CCardHeader>
          <CCardBody>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              cupiditate odit ipsa debitis amet atque molestiae! Obcaecati magni
              veniam ipsum maiores labore sint accusamus, modi rerum impedit
              similique odio alias!
            </h6>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Dashboard;
