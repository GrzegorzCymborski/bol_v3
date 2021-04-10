import CIcon from '@coreui/icons-react';
import { CForm, CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CRow, CCol, CButton } from '@coreui/react';
import { Formik } from 'formik';
import { useState } from 'react';
import { changeEmailSchema } from '../../../../utils/yup/changeEmailSchema';
import { auth } from '../../../../firebase/firebase';

type HandleEmailChangeProps = {
  email: string;
  confirmEmail: string;
};

type ChangeEmailProps = {
  toggle: () => void;
};

const ChangeEmail = ({ toggle }: ChangeEmailProps) => {
  const [emailSaved, setEmailSaved] = useState(false);

  const handleChangeEmail = (val: HandleEmailChangeProps, resetForm: () => void) => {
    setEmailSaved(true);
    auth.currentUser?.updateEmail(val.confirmEmail).catch((err) => console.log('error', err.code, err.message));
    setTimeout(() => {
      toggle();
      resetForm();
      setEmailSaved(false);
    }, 1000);
  };

  return (
    <Formik
      validationSchema={changeEmailSchema}
      validateOnChange
      onSubmit={(values, { resetForm }) => handleChangeEmail(values, resetForm)}
      initialValues={{
        email: '',
        confirmEmail: '',
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => {
        return (
          <CForm onSubmit={handleSubmit}>
            <CInputGroup className="mb-3">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cilEnvelopeOpen" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput
                name="email"
                type="text"
                value={values.email}
                onChange={handleChange}
                valid={!!(touched.email && !errors.email)}
                invalid={!!(touched.email && errors.email)}
                onBlur={handleBlur}
              />
            </CInputGroup>
            <CInputGroup className="mb-4">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cilEnvelopeOpen" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput
                name="confirmEmail"
                type="text"
                value={values.confirmEmail}
                onChange={handleChange}
                valid={!!(touched.confirmEmail && !errors.confirmEmail)}
                invalid={!!(touched.confirmEmail && errors.confirmEmail)}
                onBlur={handleBlur}
              />
            </CInputGroup>
            <CRow>
              <CCol xs="6">
                <CButton
                  color="primary"
                  className="px-4"
                  type="submit"
                  disabled={!(touched.email && !errors.confirmEmail)}
                >
                  {emailSaved ? 'Saved!' : 'Save change'}
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        );
      }}
    </Formik>
  );
};

export default ChangeEmail;
