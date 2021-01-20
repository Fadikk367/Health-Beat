import React, { useContext } from 'react';

import ExitToAppIcon from '@material-ui/icons/ExitToApp'; 
import { NavList, Link, LogoutButton } from './Navigation.css';

import { AuthContext } from 'providers/authContext';

interface NavigationProps {
  isAuthentificated: boolean;
}


const Navigation: React.FC<NavigationProps> = ({ isAuthentificated }) => {
  const { logout } = useContext(AuthContext);
  const publicNavItems = [
    <li key={1}><Link to='/'>Home</Link></li>,
    <li key={2}><Link to='/login'>Login</Link></li>,
  ]

  const privateNavItems = [
    <li key={1}><Link to='/'>Home</Link></li>,
    <li key={4}><Link to='/statistics/chart'>Statistics</Link></li>,
    <li key={3}>
      <LogoutButton 
        endIcon={<ExitToAppIcon htmlColor='white'/>}
        onClick={logout}
      >
        Logout
      </LogoutButton>
    </li>,
  ]

  const navItems = isAuthentificated ? privateNavItems : publicNavItems;

  return (
    <NavList>
      {navItems}
    </NavList>
  )
}

export default Navigation;
