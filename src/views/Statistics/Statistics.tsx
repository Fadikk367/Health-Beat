import React, { useContext, useEffect } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import { 
  AddMeasurementForm, 
  LineChart, 
  PersonalData, 
  MeasurementList, 
  Modal,
  ConfirmDeleteMeasurement,
} from 'components';
import { Profile, FlexRow, FlexItem, DataLink } from './Statistics.css';

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
      <FlexRow gap={10} layout='flex-start'>
        <DataLink to='/statistics/chart' activeStyle={{backgroundColor: '#ad1f1f'}}>Chart</DataLink>
        <DataLink to='/statistics/measurements' activeStyle={{backgroundColor: '#ad1f1f'}}>Measurements list</DataLink>
      </FlexRow>
      <Switch>
        <Route path='/statistics/chart' exact render={() => <LineChart measurements={measurements}/>}/>
        <Route path='/statistics/measurements' render={() => (
          <>
            <MeasurementList measurements={measurements}/>
            <Switch>
              <Route path='/statistics/measurements/:id/delete'>
                <Modal title='Are you sure?' height={200}>
                  <ConfirmDeleteMeasurement />
                </Modal>
              </Route>
              <Route path='/statistics/measurements/:id/edit'>
                <Modal title='Edit measurement'>
                  <h2>One day there will be edit form...</h2>
                </Modal>
              </Route>
            </Switch>
          </>
        )}/>
      </Switch>
      
    </>
  )
}

export default Statistics;
