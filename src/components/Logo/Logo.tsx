import React from 'react';
import styled from 'styled-components';


const Container = styled.h1`
  font-size: 2em;
  font-weight: 500;
  letter-spacing: 2px;
  color: white;

  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = () => {
  return (
    <Container>
      <img src='https://health-beat.s3.eu-central-1.amazonaws.com/static/media/cardiogram.e0cff65c.svg' alt=""/>
      HEALTH BEAT
    </Container>
  )
}

export default Logo;
