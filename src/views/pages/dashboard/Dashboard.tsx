import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetIcon,
} from "@coreui/react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import CIcon from "@coreui/icons-react";

const Dashboard: React.FC = () => {
  const { userAuthID } = useAppSelector((state: any) => state.user);
  const urlLink = `${process.env.REACT_APP_BASE_URL}/statistics`;

  const dataFetching = async () => {
    const response = await fetch(urlLink, {
      headers: { Authorization: userAuthID },
    });
    const json = await response.json();
    console.log(json);
  };

  dataFetching();

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
        <CRow>
          <CCol xs="12" sm="6" lg="3">
            <CWidgetIcon text="Total records" header="🚧" color="info">
              <CIcon width={24} name="cil-cart" />
            </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="3">
            <CWidgetIcon text="Categories" header="🚧" color="info">
              <CIcon width={24} name="cil-user" />
            </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="3">
            <CWidgetIcon text="Last update" header="🚧" color="info">
              <CIcon width={24} name="cilAlarm" />
            </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="3">
            <CWidgetIcon text="Server status" header="🚧" color="dark">
              <CIcon width={24} name="cilMemory" />
            </CWidgetIcon>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  );
};

export default Dashboard;
