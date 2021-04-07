import { CSpinner } from '@coreui/react';

const Spinner = () => {
  return (
    <div className="d-flex align-items-center min-vh-100 justify-content-center">
      <CSpinner color="primary" style={{ width: '40vw', height: '40vw' }} />
    </div>
  );
};

export default Spinner;
