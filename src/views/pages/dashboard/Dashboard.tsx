import React from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useQuery } from "react-query";
import { formatNumber, updateTime } from "../../../utils/utils";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CWidgetIcon,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const Dashboard: React.FC = () => {
  const dataFetching = async () => {
    const response = await fetch(urlStatsLink, {
      headers: { Authorization: userAuthID },
    });
    return await response.json();
  };

  const { data = "", isLoading, isError } = useQuery(
    "stats fetch",
    dataFetching
  );

  const { userAuthID } = useAppSelector((state: any) => state.user);
  const urlStatsLink = `${process.env.REACT_APP_BASE_URL}/statistics`;
  const { totalRows, lastUpdate, categories = [] } = data;
  const fields = ["category", "rows"];

  return (
    <CRow>
      <CCol xs="12">
        <CRow>
          <CCol xs="12" sm="6" lg="4" xl="3">
            <CWidgetIcon
              text="Total records"
              header={
                isLoading ? "Loading" : isError ? "❌" : formatNumber(totalRows)
              }
              color={isError ? "dark" : "info"}
            >
              <CIcon width={24} name="cil-cart" />
            </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="4" xl="3">
            <CWidgetIcon
              text="Categories"
              header={
                isLoading
                  ? "Loading"
                  : isError
                  ? "❌"
                  : categories.length.toString()
              }
              color={isError ? "dark" : "info"}
            >
              <CIcon width={24} name="cil-user" />
            </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="4" xl="3">
            <CWidgetIcon
              text="Last update"
              header={
                isLoading ? "Loading" : isError ? "❌" : updateTime(lastUpdate)
              }
              color={isError ? "dark" : "info"}
            >
              <CIcon width={24} name="cilAlarm" />
            </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="4" xl="3">
            <CWidgetIcon
              text="Server status"
              header={
                isLoading ? "Loading" : isError ? "Server is down!" : "All ok! "
              }
              color={isError ? "danger" : "success"}
            >
              <CIcon width={24} name="cilMemory" />
            </CWidgetIcon>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12" lg="6" xl="6">
            <CCard>
              <CCardBody>
                <CDataTable
                  items={categories}
                  fields={fields}
                  itemsPerPage={50}
                  size="sm"
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  );
};

export default Dashboard;
