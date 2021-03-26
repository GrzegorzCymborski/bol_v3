import React from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { useQuery } from 'react-query';
import { formatNumber, updateTime } from '../../../utils/utils';
import { CCard, CCardBody, CCol, CDataTable, CRow, CWidgetIcon } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { statsData } from '../../../API';
import { definitions } from '../../../types/swagger-types';

const Dashboard: React.FC = () => {
  const { userAuthID } = useAppSelector((state) => state.user);
  const { data, isLoading, isError } = useQuery<definitions['StatisticsResponse']>(
    'stats fetch',
    () => statsData(userAuthID!),
    {
      refetchOnWindowFocus: false,
    },
  );

  const fields = [
    { key: 'category', label: 'Categories', _style: { width: '80%' } },
    { key: 'rows', label: 'Records', _style: { width: '20%' }, sorter: true },
  ];

  return (
    <CRow>
      <CCol xs="12">
        <CRow>
          <CCol xs="12" sm="6" lg="4" xl="3">
            <CWidgetIcon
              text="Total records"
              header={isLoading ? 'Loading' : isError ? '❌' : formatNumber(data!.totalRows)}
              color={isError ? 'dark' : 'info'}
            >
              <CIcon width={24} name="cil-cart" />
            </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="4" xl="3">
            <CWidgetIcon
              text="Categories"
              header={isLoading ? 'Loading' : isError ? '❌' : data?.categories.length.toString()}
              color={isError ? 'dark' : 'info'}
            >
              <CIcon width={24} name="cil-user" />
            </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="4" xl="3">
            <CWidgetIcon
              text="Last update"
              header={isLoading ? 'Loading' : isError ? '❌' : updateTime(data!.lastUpdate)}
              color={isError ? 'dark' : 'info'}
            >
              <CIcon width={24} name="cilAlarm" />
            </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="4" xl="3">
            <CWidgetIcon
              text="Server status"
              header={isLoading ? 'Loading' : isError ? 'Server is down!' : 'All ok! '}
              color={isError ? 'danger' : 'success'}
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
                  items={data?.categories}
                  fields={fields}
                  itemsPerPage={50}
                  size="sm"
                  sorter
                  scopedSlots={{
                    rows: (item: definitions['Summary']) => {
                      return <td>{formatNumber(item.rows)}</td>;
                    },
                  }}
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
