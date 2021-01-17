import styled from 'styled-components';


export const FlexRow = styled.div<{ padding?: number, gap?: number }>`
  display: flex;
  justify-content: space-between;
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