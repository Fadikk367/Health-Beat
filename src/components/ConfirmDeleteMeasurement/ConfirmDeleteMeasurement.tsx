import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AnimatedButton } from 'components';
import { Container } from './ConfirmDeleteMeasurement.css'
import {MeasurementContext  } from 'providers/measurementContext';

const ConfirmDeleteMeasurement = () => {
  const { deleteMeasurement } = useContext(MeasurementContext);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const handleConfirm = async () => {
    await deleteMeasurement(id);
    history.goBack();
  }

  return (
    <Container>
      <AnimatedButton onClick={handleConfirm}>YES</AnimatedButton>
      <AnimatedButton onClick={() => history.goBack()}>NO</AnimatedButton>
    </Container>
  )
}

export default ConfirmDeleteMeasurement
