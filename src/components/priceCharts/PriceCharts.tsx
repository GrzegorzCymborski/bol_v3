import { CPagination } from '@coreui/react';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useAppSelector } from '../../hooks/reduxHooks';
import useEconomies from '../../hooks/useEconomies';

const PriceCharts = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const { trackedOfferID, trackedProductID, offerURL } = useAppSelector((state) => state.trackedSeller);

  const { data, refetch } = useEconomies(trackedProductID!, trackedOfferID!, activePage);

  data ? console.log('data', data) : null;

  useEffect(() => {
    refetch();
  }, [trackedOfferID, trackedProductID, offerURL, refetch, activePage]);

  const chartPrice = {
    options: {
      colors: ['#3C4B64'],
      xaxis: {
        categories: data?.economies?.map(({ updated_at }) => updated_at),
        labels: {
          show: false,
        },
        type: 'datetime',
      },
      yaxis: {
        min: 0,
        max: Math.max(data?.economies ? data.economies[0].price : 0) + 15,
      },
      chart: {
        type: 'area',
        zoom: {
          enabled: false,
        },
      },
      labels: data?.economies?.map(({ updated_at }) => updated_at),
      title: {
        text: 'Price',
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
        data: data?.economies?.map(({ price }) => price),
      },
    ],
  };
  const chartRating = {
    options: {
      colors: ['#3C4B64'],
      xaxis: {
        categories: data?.economies?.map(({ updated_at }) => updated_at),
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
      labels: data?.economies?.map(({ updated_at }) => updated_at),
      title: {
        text: 'Rating',
        align: 'left',
      },
      dataLabels: {
        enabled: false,
      },
    },

    series: [
      {
        name: 'Rating',
        data: data?.economies?.map(({ rating }) => rating),
      },
    ],
  };
  return (
    <>
      {data?.economies && (
        <>
          <ReactApexChart options={chartPrice.options} series={chartPrice.series} type="area" height="300px" />
          <ReactApexChart options={chartRating.options} series={chartRating.series} type="area" height="250px" />

          <CPagination
            activePage={data?.page?.current}
            pages={data?.page?.pages}
            onActivePageChange={(i: number) => setActivePage(i)}
            align="center"
            limit={5}
            size="sm"
            dots={false}
          />
        </>
      )}
    </>
  );
};

export default PriceCharts;
