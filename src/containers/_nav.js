import React from 'react';
import CIcon from '@coreui/icons-react';
import { auth } from '../firebase/firebase';

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Search',
    to: '/dashboard/search',
    icon: <CIcon name="cil-search" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tracked',
    to: '/dashboard/tracked',
    icon: <CIcon name="cil-cart" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['File tools'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Combine files',
    to: '/dashboard/utils/combine2',
    icon: 'cil-note-add',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Upload EANs',
    to: '/dashboard/utils/uploadEAN',
    icon: 'cil-cloud-upload',
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'flex-grow-1',
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Settings',
    route: '/pages',
    icon: <CIcon name="cil-cog" customClasses="c-sidebar-nav-icon" />,

    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Account settings',
        to: '/dashboard/utils/settings',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Log out',
        to: '/register',
        onClick: () => auth.signOut(),
      },
    ],
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Admin section'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Test Pages',
    route: '/pages',
    icon: <CIcon name="cil-bolt" customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Login',
        to: '/login',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 404',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
];

export default _nav;
