import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';


export const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
`;

export const Link = styled(NavLink)`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: white;
  text-decoration: none;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
`;

export const LogoutButton = styled(Button)`
  && {
    color: white;
    padding: 10px;
  }
`;