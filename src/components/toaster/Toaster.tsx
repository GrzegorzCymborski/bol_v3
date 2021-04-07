import { CSpinner, CToast, CToastBody, CToaster } from '@coreui/react';

type ToasterProps = {
  showToast: boolean;
};

const Toaster = ({ showToast }: ToasterProps) => {
  return (
    <CToaster position="bottom-right" style={{ width: '70px' }}>
      <CToast show={showToast} fade>
        <CToastBody>
          <CSpinner color="primary" />
        </CToastBody>
      </CToast>
    </CToaster>
  );
};

export default Toaster;
