import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import useUserData from '../hooks/useUserData';

const TheHeaderDropdown = () => {
  const { firebaseData, logoutUser } = useUserData();

  return (
    <CDropdown inNav className="c-header-nav-items">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CImg
          src={firebaseData?.photoURL}
          alt={firebaseData?.userEmail}
          width={40}
          height={40}
          shape="rounded-circle"
        />
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="secondary " className="text-center">
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Settings
        </CDropdownItem>

        <CDropdownItem divider />
        <CDropdownItem onClick={logoutUser}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
