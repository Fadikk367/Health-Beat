import React from 'react';

import { NavList, Link } from './Navigation.css';

interface NavigationProps {
  isAuthentificated: boolean;
}


const Navigation: React.FC<NavigationProps> = ({ isAuthentificated }) => {
  const publicNavItems = [
    <li><Link to='/'>Home</Link></li>,
    <li><Link to='/login'>Login</Link></li>,
  ]

  const privateNavItems = [
    <li><Link to='/'>Home</Link></li>,
    <li><Link to='/statistics'>Statistics</Link></li>,
    <li><Link to='/logout'>Logout</Link></li>,
  ]

  const navItems = isAuthentificated ? privateNavItems : publicNavItems;

  return (
    <NavList>
      {navItems}
    </NavList>
  )
}

export default Navigation;
