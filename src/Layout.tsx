import { create } from 'domain';
import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 1.1.em;
    font-family: 'Roboto', sans-serif;
  }
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 70px;
  min-height: calc(100vh - 70px);
`;

export const Header = styled.header`
  background-color: #ad1f1f;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: white;
  height: 70px;
`;

export const HeaderContent = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Main = styled.main`
  background-color: #f5f5f5;
  flex: 1;
`;

export const Footer = styled.footer`
  padding: 30px;
  background-color: #ad1f1f;
`;