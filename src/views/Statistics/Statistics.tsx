import React, { useContext, useEffect } from 'react';

import { AddMeasurementForm, LineChart, PersonalData } from 'components';
import { Profile, FlexRow, FlexItem } from './Statistics.css';

import { MeasurementContext } from 'providers/measurementContext';
import { AuthContext } from 'providers/authContext';

import profilePlaceholder from 'images/profile-placeholder.jpg'


const Statistics: React.FC = () => {
  const { measurements, fetchMeasurements } = useContext(MeasurementContext);
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    fetchMeasurements();
  }, []);

  return (
    <>
      <FlexRow gap={60}>
        <FlexItem width={'35%'}>
          <Profile src={profilePlaceholder}/>
        </FlexItem>
        <FlexItem flex={1}>
          <PersonalData user={user}/>
          <AddMeasurementForm token={token as string}/>
        </FlexItem>
      </FlexRow>
      <LineChart measurements={measurements}/>
    </>
  )
}

export default Statistics;
