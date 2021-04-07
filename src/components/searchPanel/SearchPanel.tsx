import CIcon from '@coreui/icons-react';
import { Formik } from 'formik';
import { searchSchema } from '../../utils/yup/searchSchema';
import {
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CButton,
} from '@coreui/react';
import { formatNumber } from '../../utils/utils';

type Category = {
  category: string;
  rows: number;
};

type StatsProps = {
  lastUpdate: string;
  totalRows: number;
  categories: Category[];
};

type ValuesProps = {
  name: string;
  results: number;
  priceMin: number;
  priceMax: number;
  ratingMin: number;
  ratingMax: number;
  category: string;
};

type SearchPanelProps = {
  compURL: (arg: ValuesProps) => void;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
  statistics: StatsProps;
  xs: string;
  totalRecords: number | undefined;
  trackedEansNumber: number | undefined;
  trackedCapacity: number | undefined;
  csvExport: () => void;
  generatingCSV: boolean;
};

const SearchPanel = ({
  compURL,
  isFetching,
  isLoading,
  isError,
  statistics,
  xs,
  totalRecords,
  trackedEansNumber,
  trackedCapacity,
  generatingCSV,
  csvExport,
}: SearchPanelProps) => {
  return (
    <CCol xs={xs}>
      <CCard>
        <CCardHeader>
          Search products
          <span className="float-right">{totalRecords && `Total records: ${formatNumber(totalRecords)}`}</span>
        </CCardHeader>
        <CCardBody>
          <Formik
            validationSchema={searchSchema}
            validateOnChange
            onSubmit={(values) => compURL(values)}
            initialValues={{
              name: '',
              results: 100,
              priceMin: 0,
              priceMax: 1000,
              ratingMin: 0,
              ratingMax: 5,
              category: '',
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => {
              return (
                <CForm onSubmit={handleSubmit}>
                  <CRow>
                    <CCol xs="12" lg="12">
                      <CFormGroup>
                        <CLabel htmlFor="name">{touched.name && errors.name ? errors.name : 'Search term'}</CLabel>
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

                    <CCol className="d-lg-flex justify-content-xl-between" xs="12" xl="8">
                      <CCol xs="12" lg="2" className="px-xl-0">
                        <CFormGroup>
                          <CLabel htmlFor="results">
                            {touched.results && errors.results ? errors.results : 'Results'}
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
                            {touched.priceMin && errors.priceMin ? errors.priceMin : 'Price min'}
                          </CLabel>
                          <CInput
                            name="priceMin"
                            value={values.priceMin}
                            onChange={handleChange}
                            type="number"
                            invalid={!!(touched.priceMin && errors.priceMin)}
                            onBlur={handleBlur}
                          />
                        </CFormGroup>
                      </CCol>

                      <CCol xs="12" lg="2" className="px-xl-0">
                        <CFormGroup>
                          <CLabel htmlFor="priceMax">
                            {touched.priceMax && errors.priceMax ? errors.priceMax : 'Price max'}
                          </CLabel>
                          <CInput
                            name="priceMax"
                            value={values.priceMax}
                            onChange={handleChange}
                            type="number"
                            invalid={!!(touched.priceMax && errors.priceMax)}
                            onBlur={handleBlur}
                          />
                        </CFormGroup>
                      </CCol>

                      <CCol xs="12" lg="2" className="px-xl-0">
                        <CFormGroup>
                          <CLabel htmlFor="ratingMin">
                            {touched.ratingMin && errors.ratingMin ? errors.ratingMin : 'Rating min'}
                          </CLabel>
                          <CInput
                            name="ratingMin"
                            value={values.ratingMin}
                            onChange={handleChange}
                            type="number"
                            invalid={!!(touched.ratingMin && errors.ratingMin)}
                            onBlur={handleBlur}
                          />
                        </CFormGroup>
                      </CCol>

                      <CCol xs="12" lg="2" className="px-xl-0">
                        <CFormGroup>
                          <CLabel htmlFor="ratingMax">
                            {touched.ratingMax && errors.ratingMax ? errors.ratingMax : 'Rating max'}
                          </CLabel>
                          <CInput
                            name="ratingMax"
                            value={values.ratingMax}
                            onChange={handleChange}
                            type="number"
                            invalid={!!(touched.ratingMax && errors.ratingMax)}
                            onBlur={handleBlur}
                          />
                        </CFormGroup>
                      </CCol>
                    </CCol>
                    <CCol xs="12" lg="4">
                      <CFormGroup>
                        <CLabel htmlFor="category">Category</CLabel>
                        <CSelect name="category" value={values.category} onChange={handleChange} onBlur={handleBlur}>
                          <option value={''}>{isError ? 'Error!' : 'All'}</option>
                          {!isLoading &&
                            !isError &&
                            statistics?.categories?.map((cat) => (
                              <option key={cat.category} value={cat.category}>
                                {cat.category}
                              </option>
                            ))}
                        </CSelect>
                      </CFormGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol className="d-flex justify-content-between justify-content-lg-end">
                      <CButton type="submit" color="primary" size="lg" className="mx-lg-2">
                        <CIcon name="cilMagnifyingGlass" className="d-none d-xl-inline-block" />
                        {isFetching ? ' Loading' : ' Search'}
                      </CButton>

                      <CButton
                        onClick={() => csvExport()}
                        color="info"
                        size="lg"
                        className="ml-lg-2"
                        disabled={!totalRecords}
                      >
                        <CIcon name="cilDescription" className="d-none d-xl-inline-block" />
                        {generatingCSV ? ' Busy..' : ' CSV'}
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              );
            }}
          </Formik>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Tracking capacity: {formatNumber(trackedCapacity!)}
          <span className="float-right">
            {trackedEansNumber ? `Tracked Products: ${trackedEansNumber}` : `Tracked Products: 0`}
          </span>
        </CCardHeader>
      </CCard>
    </CCol>
  );
};

export default SearchPanel;
