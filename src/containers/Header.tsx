import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { changeState } from '../redux/sidebar';
import { CHeader, CToggler, CHeaderNav, CHeaderBrand, CHeaderNavItem, CNavLink } from '@coreui/react';
import TheHeaderDropdown from './TheHeaderDropdown';
import CIcon from '@coreui/icons-react';
import fullLogoGray from '../assets/icons/fullLogoGray.svg';
import useUserData from '../hooks/useUserData';

const Header = () => {
  const dispatch = useAppDispatch();
  const { firebaseData } = useUserData();
  const { sidebarShow } = useAppSelector((state) => state.sidebar);

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow!) ? true : 'responsive';
    dispatch(changeState(val));
  };

  return (
    <CHeader>
      <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
      <CHeaderBrand className="d-lg-none ml-auto mr-3" to="/">
        <CIcon src={fullLogoGray} height="35" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CNavLink disabled>
            {firebaseData?.userEmail} : {firebaseData?.connectionData.ip}
          </CNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3 d-md-down-none">
        <TheHeaderDropdown />
      </CHeaderNav>
    </CHeader>
  );
};

export default Header;
