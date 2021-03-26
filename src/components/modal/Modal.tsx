import { CModal, CModalHeader, CModalBody } from '@coreui/react';

type ModalProps = {
  showModal: boolean;
};

const Modal: React.FC<ModalProps> = ({ showModal }: ModalProps) => {
  return (
    <CModal show={showModal} centered>
      <CModalHeader closeButton>Something went wrong...</CModalHeader>
      <CModalBody>No records found, please try different search criteria</CModalBody>
    </CModal>
  );
};

export default Modal;
