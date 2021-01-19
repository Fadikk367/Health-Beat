import React from 'react';

import { NavList, Link } from './Navigation.css';

interface NavigationProps {
  isAuthentificated: boolean;
}


const Navigation: React.FC<NavigationProps> = ({ isAuthentificated }) => {
  const publicNavItems = [
    <li key={1}><Link to='/'>Home</Link></li>,
    <li key={2}><Link to='/login'>Login</Link></li>,
  ]

  const privateNavItems = [
    <li key={1}><Link to='/'>Home</Link></li>,
    <li key={4}><Link to='/statistics'>Statistics</Link></li>,
    <li key={3}><Link to='/logout'>Logout</Link></li>,
  ]

  const navItems = isAuthentificated ? privateNavItems : publicNavItems;

  return (
    <NavList>
      {navItems}
    </NavList>
  )
}

export default Navigation;
