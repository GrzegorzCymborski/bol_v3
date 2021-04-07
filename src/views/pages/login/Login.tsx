import { useState } from 'react';
import tryLogin from '../../../utils/auth';
import { Formik } from 'formik';
import { loginSchema } from '../../../utils/yup/loginSchema';
import CIcon from '@coreui/icons-react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react';

type HandleSubmitProps = {
  values: {
    login: string;
    password: string;
  };
  resetForm: () => void;
};

const Login = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = async ({ values, resetForm }: HandleSubmitProps) => {
    const loginValid = await tryLogin(values);

    if (!loginValid) {
      resetForm();
      toggle();
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CModal show={modal} onClose={toggle} centered>
        <CModalHeader closeButton>Something went wrong</CModalHeader>
        <CModalBody>Please try again</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggle}>
            Go back
          </CButton>
        </CModalFooter>
      </CModal>

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik
                    validationSchema={loginSchema}
                    validateOnChange
                    onSubmit={(values, { resetForm }) => handleSubmit({ values, resetForm })}
                    initialValues={{
                      login: '',
                      password: '',
                    }}
                  >
                    {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => {
                      return (
                        <CForm onSubmit={handleSubmit}>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              name="login"
                              type="text"
                              placeholder="Username"
                              autoComplete="username"
                              value={values.login}
                              onChange={handleChange}
                              valid={!!(touched.login && !errors.login)}
                              invalid={!!(touched.login && errors.login)}
                              onBlur={handleBlur}
                            />
                          </CInputGroup>
                          <CInputGroup className="mb-4">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              name="password"
                              type="password"
                              placeholder="Password"
                              autoComplete="current-password"
                              value={values.password}
                              onChange={handleChange}
                              valid={!!(touched.password && !errors.password)}
                              invalid={!!(touched.password && errors.password)}
                              onBlur={handleBlur}
                            />
                          </CInputGroup>
                          <CRow>
                            <CCol xs="6">
                              <CButton
                                color="primary"
                                className="px-4"
                                type="submit"
                                disabled={!(touched.login && !errors.password)}
                              >
                                Login
                              </CButton>
                            </CCol>
                            <CCol xs="6" className="text-right">
                              <CButton color="link" className="px-0">
                                Forgot password?
                              </CButton>
                            </CCol>
                          </CRow>
                        </CForm>
                      );
                    }}
                  </Formik>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;

// TODO: Fix types
