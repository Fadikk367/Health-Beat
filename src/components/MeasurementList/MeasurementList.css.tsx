import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton'

export const List = styled.ul`
  font-size: 1em;
  list-style-type: none;
  padding: 30px;
`;

export const ListItem = styled.li<{ header?: boolean}>`
  display: flex;
  padding: 10px;
  align-items: center;

  border-radius: 5px;

  background-color: ${props => props.header ? '#ad1f1f' : 'default'} !important;
  color: ${props => props.header ? 'white' : 'default'} !important;
  height: ${props => props.header ? '60px' : 'deault'};

  transition: background-color 0.1s ease-in-out;

  &:nth-child(odd) {
    background-color: #eaeaea;
  }

  &:not(:first-child):hover {
    background-color: #d6d6d6 !important;
  }
`;

export const Cell = styled.span<{ flex?: number, width?: number }>`
  padding: 0 5px;
  flex: ${props => props.flex || 'none'};
  width: ${props => props.width || 'auto'}px;
`;

export const ActionButton = styled(IconButton)`
  && {
    padding: 10px;
    margin-right: 10px;
  }
`;
