import { CPagination } from '@coreui/react';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useAppSelector } from '../../hooks/reduxHooks';
import useEconomies from '../../hooks/useEconomies';

const SellerCharts = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const { trackedOfferID, trackedProductID, offerURL } = useAppSelector((state) => state.trackedSeller);

  const { data: economiesData, refetch } = useEconomies(trackedProductID!, trackedOfferID!, activePage);

  economiesData ? console.log('economiesData', economiesData) : null;

  useEffect(() => {
    refetch();
  }, [trackedOfferID, trackedProductID, offerURL, refetch, activePage]);

  const chart = {
    options: {
      colors: ['#3C4B64'],
      xaxis: {
        categories: economiesData?.economies?.map(({ updated_at }) => updated_at),
        labels: {
          show: false,
        },
        type: 'datetime',
      },
      yaxis: {
        min: 0,
        max: Math.max(economiesData?.economies ? economiesData.economies[1].price : 0) + 15,
      },
      chart: {
        type: 'area',
        zoom: {
          enabled: false,
        },
      },
      labels: economiesData?.economies?.map(({ updated_at }) => updated_at),
      title: {
        text: 'Price Charts',
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
        name: 'Price',
        data: economiesData?.economies?.map(({ price }) => price),
      },
    ],
  };

  return (
    <>
      {economiesData?.economies && (
        <ReactApexChart options={chart.options} series={chart.series} type="area" height="200%" />
      )}
      <CPagination
        activePage={economiesData?.page?.current}
        pages={economiesData?.page?.pages}
        onActivePageChange={(i: number) => setActivePage(i)}
        align="center"
        limit={5}
        size="sm"
        dots={false}
      />
    </>
  );
};

export default SellerCharts;
