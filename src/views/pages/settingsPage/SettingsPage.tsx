import { CCard, CCardBody, CCardHeader, CCol, CListGroup, CListGroupItem, CRow } from '@coreui/react';
import { useState } from 'react';
import SettingsModal from './modal/SettingsModal';

const SettingsPage = () => {
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleModal = (type: string) => {
    setModalType(type);
    setModal(!modal);
  };

  return (
    <CRow>
      <SettingsModal isOpen={modal} toggle={() => setModal(!modal)} option={modalType} />
      <CCol xs="12">
        <CCard>
          <CCardHeader>Settings module</CCardHeader>
          <CCardBody>
            <CListGroup>
              <CListGroupItem href="#" onClick={() => handleModal('email')}>
                Change email address
              </CListGroupItem>
              <CListGroupItem href="#" onClick={() => handleModal('pass')}>
                Change password
              </CListGroupItem>
              <CListGroupItem href="#" onClick={() => handleModal('username')}>
                Change username
              </CListGroupItem>
              <CListGroupItem href="#" onClick={() => handleModal('avatar')}>
                Change avatar
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default SettingsPage;
