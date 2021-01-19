import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


export const FlexRow = styled.div<{ padding?: number, gap?: number, layout?: string }>`
  display: flex;
  justify-content: ${props => props.layout || 'space-between'};
  padding: ${props => props.padding || 30}px;
  gap: ${props => props.gap || 0}px;
`;

export const FlexItem = styled.div<{ flex?: number, width?: string }>`
  flex: ${props => props.flex || 'default'};
  width: ${props => props.width || ''};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Profile = styled.img`
  width: 100%;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  border-radius: 15px;
`;

export const DataLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 1.5em;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: #999999;
  font-weight: 400;
`;