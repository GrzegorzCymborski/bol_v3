import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { changeState } from '../redux/sidebar';
import { CHeader, CToggler, CSubheader, CHeaderNav } from '@coreui/react';
import TheHeaderDropdown from './TheHeaderDropdown';

const Header = () => {
  const dispatch = useAppDispatch();
  const { sidebarShow } = useAppSelector((state) => state.sidebar);

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow!) ? true : 'responsive';
    dispatch(changeState(val));
  };

  return (
    <CHeader withSubheader>
      <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
      <CSubheader className="px-3 d-flex justify-content-end">
        <CHeaderNav className="px-3">
          <TheHeaderDropdown />
        </CHeaderNav>
      </CSubheader>
    </CHeader>
  );
};

export default Header;
