import CIcon from '@coreui/icons-react';
import { CForm, CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CRow, CCol, CButton } from '@coreui/react';
import { useEffect, useState } from 'react';
import { changeEmailSchema } from '../../../../utils/yup/changeEmailSchema';
import { auth } from '../../../../firebase/firebase';
import { useFormik } from 'formik';

const ChangeEmail = ({ toggle }: { toggle: () => void }) => {
  const [emailSaved, setEmailSaved] = useState(false);

  const { touched, errors, handleBlur, handleChange, handleSubmit, values, resetForm } = useFormik({
    initialValues: {
      email: '',
      confirmEmail: '',
    },
    onSubmit: (values) => handleChangeEmail(values),
    validationSchema: changeEmailSchema,
    validateOnChange: true,
  });

  const handleChangeEmail = ({ email }: { email: string }) => {
    setEmailSaved(true);
    auth.currentUser?.updateEmail(email).catch((err) => console.log('error', err.code, err.message));
    setTimeout(() => {
      toggle();
      setEmailSaved(false);
    }, 1000);
  };

  useEffect(() => {
    resetForm();
  }, [resetForm, toggle]);

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
          {touched.confirmEmail && !errors.confirmEmail && (
            <CButton color="primary" className="px-4" type="submit" disabled={!(touched.email && !errors.confirmEmail)}>
              {emailSaved ? 'Saved!' : 'Save'}
            </CButton>
          )}
        </CCol>
      </CRow>
    </CForm>
  );
};

export default ChangeEmail;
