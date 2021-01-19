import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import 'date-fns';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { Form, G, FormTitle } from './AddMeasurementForm.css';
import { AnimatedButton } from 'components';
import { MeasurementContext } from 'providers/measurementContext';

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

enum TimeOfDay {
  MORNING = 'MORNING',
  MIDDAY = 'MIDDAY',
  EVENING = 'EVENING',
}

interface MeasurementFormData {
  date: Date;
  systolic: number;
  diastolic: number;
  timeOfDay: TimeOfDay;
} 

const AddMeasurementForm: React.FC<{ token: string }> = ({ token }) => {
  const { addMeasurement } = useContext(MeasurementContext);
  const { register, handleSubmit, errors, control } = useForm<MeasurementFormData>();
  const [date, setDate] = useState<Date | null>(new Date());

  const handleMeasurementFormSubmit = handleSubmit(async (measurement) => {
    await addMeasurement({ ...measurement, date: format(new Date(measurement.date), 'yyyy-MM-dd') });
  })
  return (
    <Form onSubmit={handleMeasurementFormSubmit}>
      <FormTitle>Add new measurement!</FormTitle>
      <Grid container spacing={3}>
        <G item xs={6}>
          <FormControl>
            <InputLabel color='secondary' htmlFor='systolic'>Systolic:</InputLabel>
            <Input name='systolic' id='systolic' type='number' color='secondary' inputRef={register({ required: 'This filed is required', valueAsNumber: true })} />
            <FormHelperText>{errors.systolic && errors.systolic.message}</FormHelperText>
          </FormControl>
        </G>
        <G item xs={6}>
          <FormControl>
            <InputLabel color='secondary' htmlFor='diastolic'>Diastolic:</InputLabel>
            <Input name='diastolic' id='diastolic' type='number' color='secondary' inputRef={register({ required: 'This filed is required', valueAsNumber: true })} />
            <FormHelperText>{errors.diastolic && errors.diastolic.message}</FormHelperText>
          </FormControl>
        </G>
        <G item xs={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin='none'
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              color='secondary'
              name="date"
              label='Date:'
              InputLabelProps={{ color: 'secondary' }}
              inputProps={{ name: 'date', ref: register({ required: 'Date is required' }) }}
              helperText={errors.date && errors.date.message}
              value={date}
              onChange={e => setDate(e)}
            />
          </MuiPickersUtilsProvider>
        </G>
        <G item xs={6}>
          <FormControl>
            <InputLabel color='secondary'>Time of day:</InputLabel>
            <Controller
              as={
                <Select 
                  color='secondary'
                  MenuProps={{
                    disableScrollLock: true
                  }}
                >
                  <MenuItem value='MORNING'>Morning</MenuItem>
                  <MenuItem value='MIDDAY'>Midday</MenuItem>
                  <MenuItem value='EVENING'>Evening</MenuItem>
                </Select>
              }
              name='timeOfDay'
              rules={{ required: 'Time fo day is required' }}
              control={control}
              defaultValue='MORNING'
            />
          </FormControl>
        </G>
      </Grid>
    <AnimatedButton type='submit'>submit</AnimatedButton>
  </Form>
  )
}

export default AddMeasurementForm;
