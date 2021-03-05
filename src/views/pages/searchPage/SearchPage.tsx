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
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
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
  const [queryURL, setQueryURL] = useState<string>("");

  const { userAuthID } = useAppSelector((state: any) => state.user);
  const statsQuery = useQuery("stats fetch", () => statsData(userAuthID), {
    refetchOnWindowFocus: false,
  });
  const { data, isError, isLoading } = statsQuery;

  const productsQuery = useQuery(
    "products fetch",
    () => productsData(userAuthID, queryURL),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    }
  );
  const {
    data: data2,
    isError: isError2,
    isLoading: isLoading2,
    isFetching,
  } = productsQuery;

  const composeUrl = ({
    name,
    results,
    priceMin,
    priceMax,
    ratingMin,
    ratingMax,
    category,
  }: UrlProps) => {
    const queryString = `name=${encodeURIComponent(
      name.trim()
    )}&price=${priceMin}&price=${priceMax}&rate=${ratingMin}&rate=${ratingMax}${
      category ? `&category=${category}` : ""
    }&records=${results}&limit=100`;

    setQueryURL(queryString);
  };

  useEffect(() => {
    if (queryURL) {
      productsQuery.refetch();
      console.log("dupa");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryURL]);

  console.log(
    "productsQuery",
    "data",
    data2,
    "isError",
    isError2,
    "isLoading",
    isLoading2,
    "isFetching",
    isFetching
  );
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            Search products {isLoading2 ? "AAA" : "VVV"}
          </CCardHeader>
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
                            valid={!!(touched.name && !errors.name)}
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
                              placeholder="100"
                              value={values.results}
                              onChange={handleChange}
                              valid={!!(touched.results && !errors.results)}
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
                              placeholder="0"
                              value={values.priceMin}
                              onChange={handleChange}
                              type="number"
                              valid={!!(touched.priceMin && !errors.priceMin)}
                              invalid={!!(touched.priceMin && errors.priceMin)}
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
                              placeholder="1000"
                              value={values.priceMax}
                              onChange={handleChange}
                              type="number"
                              valid={!!(touched.priceMax && !errors.priceMax)}
                              invalid={!!(touched.priceMax && errors.priceMax)}
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
                              placeholder="0"
                              value={values.ratingMin}
                              onChange={handleChange}
                              type="number"
                              valid={!!(touched.ratingMin && !errors.ratingMin)}
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
                              placeholder="5"
                              value={values.ratingMax}
                              onChange={handleChange}
                              type="number"
                              valid={!!(touched.ratingMax && !errors.ratingMax)}
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
                            valid={touched.category}
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
                          Search
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

      <ul>
        {data2?.products.map((item: any) => (
          <li key={item._links.self}>{item.name}</li>
        ))}
      </ul>
    </CRow>
  );
};

export default SearchPage;
