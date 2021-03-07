import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAppSelector } from "../../../hooks/reduxHooks";
import {
  statsData,
  productsData,
  handleTrackEAN,
  queryTrackedEANs,
  fetchOffers,
} from "../../../API";
import { Formik } from "formik";
import { searchSchema } from "../../../utils/yup/searchSchema";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CDataTable,
  CForm,
  CFormGroup,
  CImg,
  CInput,
  CLabel,
  CLink,
  CModal,
  CModalBody,
  CModalHeader,
  CPagination,
  CRow,
  CSelect,
  CSpinner,
  CToast,
  CToastBody,
  CToaster,
} from "@coreui/react";

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
      newDetails = [index];
    }
    console.log("details", details);
    console.log("detailsNew", newDetails);
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

  const fields = [
    { key: "product_img", label: "Image", _style: { width: "5%" } },
    { key: "name", label: "Name" },
    { key: "ean", label: "EAN", _style: { width: "10%" } },
    { key: "subcategory", label: "Subcategory", _style: { width: "10%" } },
    { key: "price", label: "Price", _style: { width: "5%" } },
    { key: "rating", label: "Rating", _style: { width: "5%" } },
    { key: "track", label: "Track", _style: { width: "5%" } },
    { key: "show_details", label: "", _style: { width: "1%" } },
  ];

  return (
    <>
      <CToaster position="bottom-right" style={{ width: "70px" }}>
        <CToast show={isFetching} fade>
          <CToastBody>
            <CSpinner color="primary" />
          </CToastBody>
        </CToast>
      </CToaster>

      <CModal show={isError2} centered>
        <CModalHeader closeButton>Something went wrong...</CModalHeader>
        <CModalBody>
          No records found, please try different search criteria
        </CModalBody>
      </CModal>

      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>Search products</CCardHeader>
            <CCardBody>
              <Formik
                validationSchema={searchSchema}
                validateOnChange
                onSubmit={(values) => composeUrl(values)}
                initialValues={{
                  name: "",
                  results: 100,
                  priceMin: 0,
                  priceMax: 1000,
                  ratingMin: 0,
                  ratingMax: 5,
                  category: 0,
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors,
                }) => {
                  return (
                    <CForm onSubmit={handleSubmit}>
                      <CRow>
                        <CCol xs="12" lg="12">
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {touched.name && errors.name
                                ? errors.name
                                : "Search term"}
                            </CLabel>
                            <CInput
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              placeholder="What are you looking for"
                              invalid={!!(touched.name && errors.name)}
                              onBlur={handleBlur}
                            />
                          </CFormGroup>
                        </CCol>

                        <CCol
                          className="d-lg-flex justify-content-xl-between"
                          xs="12"
                          xl="8"
                        >
                          <CCol xs="12" lg="2" className="px-xl-0">
                            <CFormGroup>
                              <CLabel htmlFor="results">
                                {touched.results && errors.results
                                  ? errors.results
                                  : "Results"}
                              </CLabel>
                              <CInput
                                name="results"
                                type="number"
                                value={values.results}
                                onChange={handleChange}
                                invalid={!!(touched.results && errors.results)}
                                onBlur={handleBlur}
                              />
                            </CFormGroup>
                          </CCol>

                          <CCol xs="12" lg="2" className="px-xl-0">
                            <CFormGroup>
                              <CLabel htmlFor="priceMin">
                                {touched.priceMin && errors.priceMin
                                  ? errors.priceMin
                                  : "Price min"}
                              </CLabel>
                              <CInput
                                name="priceMin"
                                value={values.priceMin}
                                onChange={handleChange}
                                type="number"
                                invalid={
                                  !!(touched.priceMin && errors.priceMin)
                                }
                                onBlur={handleBlur}
                              />
                            </CFormGroup>
                          </CCol>

                          <CCol xs="12" lg="2" className="px-xl-0">
                            <CFormGroup>
                              <CLabel htmlFor="priceMax">
                                {touched.priceMax && errors.priceMax
                                  ? errors.priceMax
                                  : "Price max"}
                              </CLabel>
                              <CInput
                                name="priceMax"
                                value={values.priceMax}
                                onChange={handleChange}
                                type="number"
                                invalid={
                                  !!(touched.priceMax && errors.priceMax)
                                }
                                onBlur={handleBlur}
                              />
                            </CFormGroup>
                          </CCol>

                          <CCol xs="12" lg="2" className="px-xl-0">
                            <CFormGroup>
                              <CLabel htmlFor="ratingMin">
                                {touched.ratingMin && errors.ratingMin
                                  ? errors.ratingMin
                                  : "Rating min"}
                              </CLabel>
                              <CInput
                                name="ratingMin"
                                value={values.ratingMin}
                                onChange={handleChange}
                                type="number"
                                invalid={
                                  !!(touched.ratingMin && errors.ratingMin)
                                }
                                onBlur={handleBlur}
                              />
                            </CFormGroup>
                          </CCol>

                          <CCol xs="12" lg="2" className="px-xl-0">
                            <CFormGroup>
                              <CLabel htmlFor="ratingMax">
                                {touched.ratingMax && errors.ratingMax
                                  ? errors.ratingMax
                                  : "Rating max"}
                              </CLabel>
                              <CInput
                                name="ratingMax"
                                value={values.ratingMax}
                                onChange={handleChange}
                                type="number"
                                invalid={
                                  !!(touched.ratingMax && errors.ratingMax)
                                }
                                onBlur={handleBlur}
                              />
                            </CFormGroup>
                          </CCol>
                        </CCol>
                        <CCol xs="12" lg="4">
                          <CFormGroup>
                            <CLabel htmlFor="category">Category</CLabel>
                            <CSelect
                              name="category"
                              value={values.category}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value={""}>
                                {isError ? "Error!" : "All"}
                              </option>
                              {!isLoading &&
                                !isError &&
                                data?.categories.map((cat: any) => (
                                  <option
                                    key={cat.category}
                                    value={cat.category.replace(/&/, "%26")}
                                  >
                                    {cat.category}
                                  </option>
                                ))}
                            </CSelect>
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol className="d-flex justify-content-between justify-content-lg-end">
                          <CButton
                            type="submit"
                            color="primary"
                            size="lg"
                            className="mx-lg-2"
                          >
                            <CIcon
                              name="cil-scrubber"
                              className="d-none d-xl-inline-block"
                            />{" "}
                            {isFetching ? "Loading" : "Search"}
                          </CButton>

                          <CButton
                            type="submit"
                            color="primary"
                            size="lg"
                            className="mx-lg-2"
                          >
                            <CIcon
                              name="cil-scrubber"
                              className="d-none d-xl-inline-block"
                            />{" "}
                            CSV
                          </CButton>

                          <CButton
                            type="submit"
                            color="primary"
                            size="lg"
                            className="ml-lg-2"
                          >
                            <CIcon
                              name="cil-scrubber"
                              className="d-none d-xl-inline-block"
                            />{" "}
                            Track
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  );
                }}
              </Formik>
            </CCardBody>
          </CCard>
        </CCol>

        {productsQuery?.data ? (
          <CCol xs="12">
            <CCard>
              <CCardBody>
                <CDataTable
                  items={data2?.products}
                  fields={fields}
                  scopedSlots={{
                    product_img: ({ product_img }: any) => (
                      <td>
                        <CImg src={product_img} thumbnail />
                      </td>
                    ),
                    track: ({ ean }: any) => (
                      <td>
                        {data3?.includes(ean) ? (
                          <CIcon name="cilCheck" />
                        ) : (
                          <CIcon
                            name="cil-cart"
                            type="button"
                            onClick={(e) => {
                              const target = e.target as HTMLElement;

                              target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-icon" role="img"><path fill="var(--ci-primary-color, currentColor)" d="M199.066,456l-7.379-7.514-3.94-3.9-86.2-86.2.053-.055L17.936,274.665l97.614-97.613,83.565,83.565L398.388,61.344,496,158.958,296.729,358.229,285.469,369.6ZM146.6,358.183l52.459,52.46.1-.1.054.054,52.311-52.311,11.259-11.368L450.746,158.958,398.388,106.6,199.115,305.871,115.55,222.306,63.191,274.665l83.464,83.463Z" class="ci-primary"></path></svg>`;
                              handleTrackEAN(userAuthID, ean);
                              eansQuery.refetch();
                            }}
                          />
                        )}
                      </td>
                    ),
                    show_details: (item: never, index: never) => {
                      return (
                        <td className="py-2">
                          <CButton
                            size="sm"
                            onClick={() => {
                              toggleDetails(index);
                            }}
                          >
                            {details.includes(index) ? (
                              <CIcon name="cilFullscreen" />
                            ) : (
                              <CIcon name="cilFullscreenExit" />
                            )}
                          </CButton>
                        </td>
                      );
                    },
                    details: (item: any, index: never) => {
                      const newArr = Object.entries(item).filter(
                        (item: any) =>
                          !item.includes("product_img") &&
                          !item.includes("_links")
                      );
                      return (
                        <CCollapse show={details.includes(index)}>
                          {details.includes(index)
                            ? setMoreDetails(item._links.offers)
                            : null}
                          <CRow>
                            <CCol sm="6" md="4">
                              <CCardBody>
                                <CImg
                                  src={item.product_img}
                                  fluidGrow
                                  height="400px"
                                />
                              </CCardBody>
                            </CCol>

                            <CCol sm="6" md="4">
                              <CCardBody>
                                <CDataTable
                                  items={newArr}
                                  header={false}
                                  hover
                                  addTableClasses={{ borderBottom: "0px" }}
                                />
                              </CCardBody>
                            </CCol>

                            <CCol sm="2" md="4">
                              <CCardBody>
                                <CCardHeader>Sellers:</CCardHeader>
                                <CCardBody>
                                  {data6?.map(
                                    ({
                                      offer_url,
                                      seller,
                                      _links: { self },
                                    }: any) => (
                                      <div key={offer_url}>
                                        <CLink
                                          className="btn"
                                          href={`https://bol.com${offer_url}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {seller}
                                        </CLink>
                                      </div>
                                    )
                                  )}
                                </CCardBody>
                              </CCardBody>
                            </CCol>
                          </CRow>
                        </CCollapse>
                      );
                    },
                  }}
                />
              </CCardBody>
            </CCard>
            <CPagination
              activePage={data2?.page.current}
              pages={data2?.page.pages}
              onActivePageChange={(i: any) => setCurrentPage(i)}
              align="center"
              limit={5}
            />
          </CCol>
        ) : null}
      </CRow>
    </>
  );
};

export default SearchPage;
