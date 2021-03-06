import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { statsData, productsData } from "../../../API";
import { Formik } from "formik";
import { searchSchema } from "../../../utils/yup/searchSchema";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CForm,
  CFormGroup,
  CImg,
  CInput,
  CLabel,
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
import CIcon from "@coreui/icons-react";

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
  const { userAuthID } = useAppSelector((state: any) => state.user);
  const [queryURL, setQueryURL] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const statsQuery = useQuery("stats fetch", () => statsData(userAuthID), {
    refetchOnWindowFocus: false,
  });
  const { data, isError, isLoading } = statsQuery;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryURL, currentPage]);

  // console.log(
  //   "productsQuery",
  //   "data",
  //   data2,
  //   "isError",
  //   isError2,
  //   "isLoading",
  //   isLoading2,
  //   "isFetching",
  //   isFetching
  // );
  // console.log("productsQuery", "data", data2?.page);

  const fields = [
    { key: "product_img", label: "Image", _style: { width: "5%" } },
    { key: "name", label: "Name" },
    { key: "ean", label: "EAN", _style: { width: "10%" } },
    { key: "subcategory", label: "Subcategory", _style: { width: "10%" } },
    { key: "price", label: "Price", _style: { width: "5%" } },
    { key: "rating", label: "Rating", _style: { width: "5%" } },
    { label: "Actions", _style: { width: "5%" } },
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
