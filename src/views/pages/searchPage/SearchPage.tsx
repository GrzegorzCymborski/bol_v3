import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { CRow } from '@coreui/react';
import Modal from '../../../components/modal/Modal';
import Toaster from '../../../components/toaster/Toaster';
import SearchPanel from '../../../components/searchPanel/SearchPanel';
import ProductsList from '../../../components/productsList/ProductsList';
import useStats from '../../../hooks/useStats';
import { UrlProps } from '../../../types';
import useProductsFetch from '../../../hooks/useProductsFetch';
import useTrackedEANS from '../../../hooks/useTrackedEANS';
import useCSVquery from '../../../hooks/useCSVquery';

const SearchPage = () => {
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
  const { data, isError, isLoading } = useStats();
  const { productsResponse, isProductsError, isFetching, productsRefetch } = useProductsFetch(queryURL!, currentPage);
  const { trackedEANsArr, refetchEANS } = useTrackedEANS();
  const { generatingCSV, refetchCSV } = useCSVquery(queryCSVurl);

  const composeUrl = ({ name, results, priceMin, priceMax, ratingMin, ratingMax, category }: UrlProps) => {
    queryString = `${
      name ? `name=${encodeURIComponent(name.trim())}&` : ''
    }price=${priceMin}&price=${priceMax}&rate=${ratingMin}&rate=${ratingMax}${
      category ? `&category=${category}` : ''
    }&records=${results}&limit=100`;
    setQueryCSVurl(queryString);
    setQueryURL({ name, results, priceMin, priceMax, ratingMin, ratingMax, category });
  };

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
      <Modal showModal={isProductsError || productsResponse?.statusCode === 204} />

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
          refetchEANS={refetchEANS}
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
