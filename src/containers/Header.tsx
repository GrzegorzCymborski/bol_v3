import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { changeState } from '../redux/sidebar';
import { CHeader, CToggler, CSubheader, CLink } from '@coreui/react';
import CIcon from '@coreui/icons-react';

const Header: React.FC = () => {
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
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-settings" alt="Settings" />
            &nbsp;Settings
          </CLink>
        </div>
      </CSubheader>
    </CHeader>
  );
};

export default Header;
