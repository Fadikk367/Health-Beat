import React from 'react';
import { Link } from 'react-router-dom';

import { Measurement } from 'interfaces';
import { List, ListItem, Cell, ActionButton } from './MeasurementList.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface MeasurementListProps {
  measurements: Measurement[];
}


const MeasurementList: React.FC<MeasurementListProps> = ({ measurements }) => {
  const ListHeader = (
    <ListItem key={0} header>
      <Cell width={40}>Lp.</Cell>
      <Cell flex={4}>Systolic/Diastolic</Cell>
      <Cell flex={2}>Date</Cell>
      <Cell flex={2}>Time of day</Cell>
      <Cell width={120}>Actions</Cell>
    </ListItem>
  );

  const items = measurements.map((item, i) => (
    <ListItem key={item._id}>
      <Cell width={40}>{i}.</Cell>
      <Cell flex={4}>{item.systolic}/{item.diastolic}</Cell>
      <Cell flex={2}>{item.date}</Cell>
      <Cell flex={2}>{item.timeOfDay}</Cell>
      <Cell width={120}>
        <Link to={`/statistics/measurements/${item._id}/edit`}>
          <ActionButton>
            <EditIcon />
          </ActionButton>
        </Link>
        <Link to={`/statistics/measurements/${item._id}/delete`}>
          <ActionButton>
            <DeleteIcon />
          </ActionButton>
        </Link>
      </Cell>
    </ListItem>
  ));

  return (
    <List>
      {ListHeader}
      {items}
    </List>
  )
}

export default MeasurementList;
