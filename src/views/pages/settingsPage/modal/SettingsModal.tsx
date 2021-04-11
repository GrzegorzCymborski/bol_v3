import { CModal, CModalBody, CModalHeader } from '@coreui/react';
import ChangeEmail from './changeEmail';

type SettingsModalProps = {
  isOpen: boolean;
  toggle: () => void;
  option: string;
};

const SettingsModal = ({ isOpen, toggle, option }: SettingsModalProps) => {
  let modalHeader = '';
  let modalBody: JSX.Element | undefined;

  switch (option) {
    case 'email':
      modalHeader = 'Change email';
      modalBody = <ChangeEmail toggle={toggle} />;
      break;
    case 'pass':
      modalHeader = 'Change password';
      modalBody = <ChangeEmail toggle={toggle} />;
      break;
    case 'username':
      modalHeader = 'Change username';
      modalBody = <ChangeEmail toggle={toggle} />;
      break;
    case 'avatar':
      modalHeader = 'Change avatar';
      modalBody = <ChangeEmail toggle={toggle} />;
      break;
    default:
      break;
  }
  return (
    <CModal show={isOpen} onClose={toggle} centered closeOnBackdrop={false}>
      <CModalHeader closeButton>{modalHeader}</CModalHeader>
      <CModalBody>{modalBody}</CModalBody>
    </CModal>
  );
};

export default SettingsModal;
