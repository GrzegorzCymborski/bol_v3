import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { CRow } from '@coreui/react';
import Modal from '../../../components/modal/Modal';
import Toaster from '../../../components/toaster/Toaster';
import SearchPanel from '../../../components/searchPanel/SearchPanel';
import ProductsList from '../../../components/productsList/ProductsList';
import { statsData, productsData, queryTrackedEANs, exportCSVtoFile } from '../../../API';

type UrlProps = {
  name: string;
  results: number;
  priceMin: number;
  priceMax: number;
  ratingMin: number;
  ratingMax: number;
  category: number | string;
};

const SearchPage: React.FC = () => {
  const [details, setDetails] = useState<number[]>([]);

  const toggleDetails = (index: number) => {
    let newDetails = [index];
    if (details[0] === newDetails[0]) {
      newDetails = [];
    }
    setDetails(newDetails);
  };

  const { userAuthID, firebaseData } = useAppSelector((state) => state.user);
  const [queryURL, setQueryURL] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const statsQuery = useQuery('stats fetch', () => statsData(userAuthID!), {
    refetchOnWindowFocus: false,
  });
  const { data, isError, isLoading } = statsQuery;

  const productsQuery = useQuery('products fetch', () => productsData(userAuthID!, queryURL, currentPage), {
    enabled: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: false,
    cacheTime: 5000,
  });
  const { data: productsResponse, isError: isError2, isFetching } = productsQuery;
  const eansQuery = useQuery('tracked eans', () => queryTrackedEANs(userAuthID!));

  const { data: trackedEANsArr } = eansQuery;

  const csvQuery = useQuery('query csv', () => exportCSVtoFile(userAuthID!, queryURL), {
    enabled: false,
  });

  const { isFetching: generatingCSV } = csvQuery;

  const composeUrl = ({ name, results, priceMin, priceMax, ratingMin, ratingMax, category }: UrlProps) => {
    const queryString = `${
      name ? `name=${encodeURIComponent(name.trim())}&` : ''
    }price=${priceMin}&price=${priceMax}&rate=${ratingMin}&rate=${ratingMax}${
      category ? `&category=${category}` : ''
    }&records=${results}&limit=100`;

    setQueryURL(queryString);
  };

  useEffect(() => {
    if (queryURL) {
      productsQuery.refetch();
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
      <Toaster showToast={isFetching || generatingCSV} />
      <Modal showModal={isError2} />

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
          csvExport={() => csvQuery.refetch()}
          generatingCSV={generatingCSV}
        />

        <ProductsList
          productsQuery={productsQuery ? productsQuery : undefined}
          productsData={productsResponse ? productsResponse : undefined}
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
