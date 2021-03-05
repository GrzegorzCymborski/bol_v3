import React from "react";
import { useQuery } from "react-query";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { statsData } from "../../../API";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const SearchPage: React.FC = () => {
  const { userAuthID } = useAppSelector((state: any) => state.user);
  const { data = "", isLoading, isError } = useQuery("stats fetch", () =>
    statsData(userAuthID)
  );
  const { categories = [] } = data;

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Search products</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="12" lg="12">
                <CFormGroup>
                  <CLabel htmlFor="name">Name</CLabel>
                  <CInput id="name" placeholder="What are you looking for" />
                </CFormGroup>
              </CCol>

              <CCol
                className="d-lg-flex justify-content-xl-between"
                xs="12"
                xl="8"
              >
                <CCol xs="12" lg="2" className="px-xl-0">
                  <CFormGroup>
                    <CLabel htmlFor="results">Results</CLabel>
                    <CInput id="results" placeholder="100" />
                  </CFormGroup>
                </CCol>

                <CCol xs="12" lg="2" className="px-xl-0">
                  <CFormGroup>
                    <CLabel htmlFor="priceMin">Price min </CLabel>
                    <CInput id="priceMin" placeholder="0" />
                  </CFormGroup>
                </CCol>

                <CCol xs="12" lg="2" className="px-xl-0">
                  <CFormGroup>
                    <CLabel htmlFor="priceMax">Price max </CLabel>
                    <CInput id="priceMax" placeholder="1000" />
                  </CFormGroup>
                </CCol>

                <CCol xs="12" lg="2" className="px-xl-0">
                  <CFormGroup>
                    <CLabel htmlFor="ratingMin">Rating min</CLabel>
                    <CInput id="ratingMin" placeholder="0" />
                  </CFormGroup>
                </CCol>

                <CCol xs="12" lg="2" className="px-xl-0">
                  <CFormGroup>
                    <CLabel htmlFor="ratingMax">Rating max </CLabel>
                    <CInput id="ratingMax" placeholder="5" />
                  </CFormGroup>
                </CCol>
              </CCol>
              <CCol xs="12" lg="4">
                <CFormGroup>
                  <CLabel htmlFor="category">Category</CLabel>
                  <CSelect id="category">
                    <option value={""}>{isError ? "Error!" : "All"}</option>
                    {!isLoading &&
                      !isError &&
                      categories.map((cat: any) => (
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default SearchPage;
