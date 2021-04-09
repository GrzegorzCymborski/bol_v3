import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { changeState } from '../redux/sidebar';
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarBrand,
} from '@coreui/react';
import fullLogo from '../assets/icons/fullLogo.svg';
import smallLogo from '../assets/icons/smallLogo.svg';
import navigation from './_nav';
import CIcon from '@coreui/icons-react';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { sidebarShow } = useAppSelector((state) => state.sidebar);

  return (
    <CSidebar
      show={sidebarShow}
      onShowChange={(val: string) => {
        dispatch(changeState(val));
      }}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon className="c-sidebar-brand-full" height={35} src={fullLogo} />
        <CIcon className="c-sidebar-brand-minimized" height={35} src={smallLogo} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default Sidebar;
