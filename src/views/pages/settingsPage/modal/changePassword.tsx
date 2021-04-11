import CIcon from '@coreui/icons-react';
import { CForm, CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CRow, CCol, CButton } from '@coreui/react';
import { useEffect, useState } from 'react';
import { changePassSchema } from '../../../../utils/yup/changePassSchema';
import { useFormik } from 'formik';
import { auth } from '../../../../firebase/firebase';

const ChangePassword = ({ toggle }: { toggle: () => void }) => {
  const [passwordSaved, setPasswordSaved] = useState(false);

  const { touched, errors, handleBlur, handleChange, handleSubmit, values, resetForm } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => handleChangeEmail(values),
    validationSchema: changePassSchema,
    validateOnChange: true,
  });

  const handleChangeEmail = ({ password }: { password: string }) => {
    setPasswordSaved(true);
    auth.currentUser?.updatePassword(password).catch((err) => console.log('error', err.code, err.message));
    setTimeout(() => {
      toggle();
      setPasswordSaved(false);
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
            <CIcon name="cilAsteriskCircle" />
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput
          name="password"
          type="text"
          value={values.password}
          onChange={handleChange}
          valid={!!(touched.password && !errors.password)}
          invalid={!!(touched.password && errors.password)}
          onBlur={handleBlur}
        />
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cilAsteriskCircle" />
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput
          name="confirmPassword"
          type="text"
          value={values.confirmPassword}
          onChange={handleChange}
          valid={!!(touched.confirmPassword && !errors.confirmPassword)}
          invalid={!!(touched.confirmPassword && errors.confirmPassword)}
          onBlur={handleBlur}
        />
      </CInputGroup>
      <CRow>
        <CCol xs="6">
          {touched.confirmPassword && !errors.confirmPassword && (
            <CButton
              color="primary"
              className="px-4"
              type="submit"
              disabled={!(touched.password && !errors.confirmPassword)}
            >
              {passwordSaved ? 'Saved!' : 'Save'}
            </CButton>
          )}
        </CCol>
      </CRow>
    </CForm>
  );
};

export default ChangePassword;
