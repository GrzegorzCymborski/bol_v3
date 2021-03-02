import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { changeState } from "../redux/sidebar";
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import navigation from "./_nav";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const sidebarShow = useAppSelector((state) => state.sidebar.sidebarShow);

  return (
    <CSidebar
      show={sidebarShow}
      onShowChange={(val: any) => dispatch(changeState(val))}
    >
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
