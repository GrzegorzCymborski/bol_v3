import CIcon from '@coreui/icons-react';
import { CForm, CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CRow, CCol, CButton } from '@coreui/react';
import { useEffect, useState } from 'react';
import { changeUsername } from '../../../../utils/yup/changeUsername';
import { auth } from '../../../../firebase/firebase';
import { useFormik } from 'formik';
import { firestore } from '../../../../firebase/firebase';

const ChangeUsername = ({ toggle }: { toggle: () => void }) => {
  const [usernameSaved, setUsernameSaved] = useState(false);
  const userDatabase = firestore.collection('users');

  const { touched, errors, handleBlur, handleChange, handleSubmit, values, resetForm } = useFormik({
    initialValues: {
      username: '',
    },
    onSubmit: (values) => handleChangeEmail(values),
    validationSchema: changeUsername,
    validateOnChange: true,
  });

  const handleChangeEmail = ({ username }: { username: string }) => {
    setUsernameSaved(true);
    console.log(username);
    userDatabase.doc(auth.currentUser?.uid).update({
      username,
    });
    setTimeout(() => {
      toggle();
      setUsernameSaved(false);
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
            <CIcon name="cilUser" />
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput
          name="username"
          type="text"
          value={values.username}
          onChange={handleChange}
          valid={!!(touched.username && !errors.username)}
          invalid={!!(touched.username && errors.username)}
          onBlur={handleBlur}
        />
      </CInputGroup>

      <CRow>
        <CCol xs="6">
          {touched.username && (
            <CButton color="primary" className="px-4" type="submit" disabled={!(touched.username && !errors.username)}>
              {usernameSaved ? 'Saved!' : 'Save'}
            </CButton>
          )}
        </CCol>
      </CRow>
    </CForm>
  );
};

export default ChangeUsername;
