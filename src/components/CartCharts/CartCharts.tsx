import { CPagination } from '@coreui/react';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useAppSelector } from '../../hooks/reduxHooks';
import useCarts from '../../hooks/useCarts';

const CartCharts = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const { trackedOfferID, trackedProductID, offerURL } = useAppSelector((state) => state.trackedSeller);

  const { data, refetch } = useCarts(trackedProductID!, trackedOfferID!, activePage);

  useEffect(() => {
    refetch();
  }, [trackedOfferID, trackedProductID, offerURL, refetch, activePage]);

  const chart = {
    options: {
      colors: ['#3C4B64'],
      xaxis: {
        categories: data?.sales?.map(({ updated_at }) => updated_at),
        labels: {
          show: false,
        },
        type: 'datetime',
      },
      yaxis: {
        min: 0,
      },
      chart: {
        type: 'area',
        zoom: {
          enabled: false,
        },
      },
      labels: data?.sales?.map(({ updated_at }) => updated_at),
      title: {
        text: 'Stock',
        align: 'left',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
    },

    series: [
      {
        name: 'Stock',
        data: data?.sales?.map(({ amount }) => amount),
      },
    ],
  };

  return (
    <>
      {data?.sales && (
        <>
          <ReactApexChart options={chart.options} series={chart.series} type="area" height="190px" />
          <CPagination
            activePage={data?.page?.current}
            pages={data?.page?.pages}
            onActivePageChange={(i: number) => setActivePage(i)}
            align="start"
            limit={5}
            size="sm"
            dots={false}
          />
        </>
      )}
    </>
  );
};

export default CartCharts;
