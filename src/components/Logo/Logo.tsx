import React from 'react';
import styled from 'styled-components';

import logo from 'svgs/cardiogram.svg'

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
      <img src={logo} alt=""/>
      HEALTH BEAT
    </Container>
  )
}

export default Logo;
