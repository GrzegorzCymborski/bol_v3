import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { CRow } from "@coreui/react";
import Modal from "../../../components/modal/Modal";
import Toaster from "../../../components/toaster/Toaster";
import SearchPanel from "../../../components/searchPanel/SearchPanel";
import ProductsList from "../../../components/productsList/ProductsList";
import {
  statsData,
  productsData,
  queryTrackedEANs,
  fetchOffers,
} from "../../../API";

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
  const [details, setDetails] = useState([]);
  const [moreDetails, setMoreDetails] = useState();

  const toggleDetails = (index: never) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const { userAuthID } = useAppSelector((state: any) => state.user);
  const [queryURL, setQueryURL] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const statsQuery = useQuery("stats fetch", () => statsData(userAuthID), {
    refetchOnWindowFocus: false,
  });
  const { data = [], isError, isLoading } = statsQuery;

  const productsQuery = useQuery(
    "products fetch",
    () => productsData(userAuthID, queryURL, currentPage),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
      cacheTime: 5000,
    }
  );
  const { data: data2, isError: isError2, isFetching } = productsQuery;

  const eansQuery = useQuery("tracked eans", () =>
    queryTrackedEANs(userAuthID)
  );
  const { data: { data: data3 = [] } = [] } = eansQuery;

  const fetchMoreQuery = useQuery(
    "fetch more sellers",
    () => fetchOffers(userAuthID, moreDetails),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
  const { data: data6 } = fetchMoreQuery;

  const composeUrl = ({
    name,
    results,
    priceMin,
    priceMax,
    ratingMin,
    ratingMax,
    category,
  }: UrlProps) => {
    const queryString = `${
      name ? `name=${encodeURIComponent(name.trim())}&` : ""
    }price=${priceMin}&price=${priceMax}&rate=${ratingMin}&rate=${ratingMax}${
      category ? `&category=${category}` : ""
    }&records=${results}&limit=100`;

    setQueryURL(queryString);
  };

  useEffect(() => {
    if (queryURL) {
      productsQuery.refetch();
    }
    if (moreDetails) {
      fetchMoreQuery.refetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryURL, currentPage]);

  useEffect(() => {
    if (moreDetails) {
      fetchMoreQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moreDetails]);

  return (
    <>
      <Toaster showToast={isFetching} />
      <Modal showModal={isError2} />

      <CRow>
        <SearchPanel
          compURL={composeUrl}
          isFetching={isFetching}
          isLoading={isLoading}
          isError={isError}
          statistics={data}
          xs="12"
        />

        <ProductsList
          productsQuery={productsQuery}
          productsData={data2}
          trackedEANs={data3}
          userAuthID={userAuthID}
          eansQuery={eansQuery}
          toggleDetails={toggleDetails}
          details={details}
          setMoreDetails={setMoreDetails}
          sellers={data6}
          setCurrentPage={setCurrentPage}
        />
      </CRow>
    </>
  );
};

export default SearchPage;
