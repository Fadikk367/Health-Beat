import styled, { keyframes } from 'styled-components';

const showUp = keyframes`
  0% { transform: scale(0.6); opacity: 0.6; }
  100% { transform: scale(1.0); opacity: 1; }
`;

const fadeIn = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;


export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.15s ease-in-out;
`;

export const ModalContent = styled.div<{ width?: number, height?: number}>`
  z-index: 101;
  border-radius: 5px;
  overflow: hidden;

  width: ${props => props.width || 400}px;
  height: ${props => props.height || 400}px;
  animation: ${showUp} 0.15s ease-in-out;

  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ad1f1f;
  padding: 5px 10px;
  color: white;
`;

export const ModalTitle = styled.h3`
  font-size: 1.4em;
  font-weight: 300;
`;