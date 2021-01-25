import styled from 'styled-components';

export const Paragraph = styled.p`
  font-size: 1.1em;
`;

export const CardsPanel = styled.section`
  display: flex;
  gap: 30px;
`;


export const Card = styled.article`
  flex: 1;
  height: 300px;
  background-color: #e9e9e9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const CardHeader = styled.h3`
  color: #ad1f1f;
  font-size: 1.4em;
  font-weight: 500;
  text-align: center;
  padding: 0 20px 30px 20px;
`;