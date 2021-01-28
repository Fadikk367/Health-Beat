import styled from 'styled-components';

export const Container = styled.div`

`;

export const Title = styled.h1`
  font-size: 2.2em;
  letter-spacing: 1px;
  font-weight: 500;
  text-align: center;
  color: #ad1f1f;
  margin: 20px auto;
`;

export const Subtitle = styled.h1`
  font-size: 1.7em;
  font-weight: 400;
  text-align: center;
  color: #ad1f1f;
`;

export const Paragraph = styled.p`
  font-size: 1.2em;
  text-align: center;
`;

export const CardsPanel = styled.section`
  margin: 20px;
  display: flex;
  gap: 50px;
`;

export const Graphic = styled.img`
  display: block;
  width: 60%;
  min-width: 500px;
  min-height: 376px;
`;


export const Card = styled.article`
  flex: 1;
  min-height: 240px;
  background-color: #e9e9e9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 5px;

  -webkit-box-shadow: 2px 3px 15px -4px rgba(102,102,102,1);
  -moz-box-shadow: 2px 3px 15px -4px rgba(102,102,102,1);
  box-shadow: 2px 3px 15px -4px rgba(102,102,102,1);
`;

export const CardHeader = styled.h3`
  color: #ad1f1f;
  font-size: 1.5em;
  font-weight: 500;
  text-align: center;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #ad1f1f;
`;