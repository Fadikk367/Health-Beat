import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


export const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
`;

export const Link = styled(NavLink)`
  padding: 1rem 2rem;
  font-size: 1.1em;
  color: white;
  text-decoration: none;
`;