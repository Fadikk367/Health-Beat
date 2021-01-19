import React from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';

import { ModalWrapper, ModalContent, ModalHeader, ModalTitle } from './Modal.css';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

interface ModalProps {
  title: string;
  width?: number;
  height?: number;
}


const Modal: React.FC<ModalProps> = ({ title, children, width = 400, height = 400 }) => {
  const history = useHistory();

  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    history.goBack();
  }

  return createPortal(
    <ModalWrapper onClick={handleCloseModal}>
      <ModalContent onClick={e => e.stopPropagation()} width={width} height={height}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <IconButton 
            onClick={handleCloseModal}
          >
            <CloseIcon htmlColor='white'/>
          </IconButton>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalWrapper>,
    document.getElementById('modal')!
  )
}

export default Modal;
