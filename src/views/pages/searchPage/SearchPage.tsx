import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { CRow } from '@coreui/react';
import Modal from '../../../components/modal/Modal';
import Toaster from '../../../components/toaster/Toaster';
import SearchPanel from '../../../components/searchPanel/SearchPanel';
import ProductsList from '../../../components/productsList/ProductsList';
import { fetcher } from '../../../utils/fetcher';
import { operations } from '../../../types/swagger-types';
import { exportCSVtoFile } from '../../../API';

type UrlProps = {
  name: string;
  results: number;
  priceMin: number;
  priceMax: number;
  ratingMin: number;
  ratingMax: number;
  category: operations['getProducts']['parameters']['query']['category'] | string;
};

const SearchPage: React.FC = () => {
  const [details, setDetails] = useState<number[]>([]);
  let queryString = '';
  const toggleDetails = (index: number) => {
    let newDetails = [index];
    if (details[0] === newDetails[0]) {
      newDetails = [];
    }
    setDetails(newDetails);
  };

  const { userAuthID, firebaseData } = useAppSelector((state) => state.user);
  const [queryURL, setQueryURL] = useState<UrlProps>();
  const [queryCSVurl, setQueryCSVurl] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isError, isLoading } = useQuery(
    'stats fetch',
    () => fetcher('/statistics', 'get', { authorization: userAuthID! }),
    {
      refetchOnWindowFocus: false,
    },
  );

  const { data: productsResponse, isError: isError2, isFetching, refetch: productsRefetch } = useQuery(
    'products fetch',
    () =>
      fetcher('/products', 'get', { authorization: userAuthID! }, undefined, {
        price: [queryURL!.priceMin, queryURL!.priceMax],
        rate: [queryURL!.ratingMin, queryURL!.ratingMax],
        records: queryURL?.results,
        ...(queryURL?.name ? { name: queryURL.name } : null),
        ...(queryURL?.category ? { category: queryURL.category as any } : null),
        page: currentPage,
        limit: 100,
      }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
      cacheTime: 5000,
    },
  );

  const composeUrl = ({ name, results, priceMin, priceMax, ratingMin, ratingMax, category }: UrlProps) => {
    queryString = `${
      name ? `name=${encodeURIComponent(name.trim())}&` : ''
    }price=${priceMin}&price=${priceMax}&rate=${ratingMin}&rate=${ratingMax}${
      category ? `&category=${category}` : ''
    }&records=${results}&limit=100`;
    setQueryCSVurl(queryString);
    setQueryURL({ name, results, priceMin, priceMax, ratingMin, ratingMax, category });
  };

  const csvQuery = useQuery('query csv', () => exportCSVtoFile(userAuthID!, queryCSVurl), {
    enabled: false,
  });

  const { isFetching: generatingCSV, refetch: refetchCSV } = csvQuery;

  const eansQuery = useQuery('tracked eans', () => fetcher('/carts/raw', 'get', { authorization: userAuthID! }));
  const { data: trackedEANsArr } = eansQuery;

  useEffect(() => {
    if (queryURL) {
      productsRefetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryURL, currentPage]);

  const handleAllowTracking = () => {
    if (firebaseData && trackedEANsArr) {
      return firebaseData.cart.maxCartCapacity == trackedEANsArr?.data?.length;
    }
  };
  return (
    <>
      <Toaster showToast={isFetching} />
      <Modal showModal={isError2 || productsResponse?.statusCode === 204} />

      <CRow>
        <SearchPanel
          compURL={composeUrl}
          isFetching={isFetching}
          isLoading={isLoading}
          isError={isError}
          statistics={data!}
          xs="12"
          totalRecords={productsResponse?.rows}
          trackedEansNumber={trackedEANsArr?.data?.length}
          trackedCapacity={firebaseData?.cart.maxCartCapacity}
          csvExport={() => refetchCSV()}
          generatingCSV={generatingCSV}
        />

        <ProductsList
          productsData={productsResponse}
          trackedEANs={trackedEANsArr?.data}
          userAuthID={userAuthID!}
          eansQuery={eansQuery}
          toggleDetails={toggleDetails}
          details={details}
          setCurrentPage={setCurrentPage}
          allowTracking={handleAllowTracking()}
        />
      </CRow>
    </>
  );
};

export default SearchPage;
