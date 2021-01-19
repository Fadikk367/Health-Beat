import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';

import 'date-fns';
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

  const handleMeasurementFormSubmit = handleSubmit(async (measurement) => {
    await addMeasurement({ ...measurement, date: measurement.date.toISOString().substring(0, 10) });
  })
  return (
    <Form onSubmit={handleMeasurementFormSubmit}>
      <FormTitle>Add new measurement!</FormTitle>
      <Grid container spacing={3}>
        <G item xs={6}>
          <FormControl>
            <InputLabel htmlFor='systolic'>Systolic:</InputLabel>
            <Input name='systolic' id='systolic' type='number' inputRef={register({ required: 'This filed is required', valueAsNumber: true })} />
            <FormHelperText>{errors.systolic && errors.systolic.message}</FormHelperText>
          </FormControl>
        </G>
        <G item xs={6}>
          <FormControl>
            <InputLabel htmlFor='diastolic'>Diastolic:</InputLabel>
            <Input name='diastolic' id='diastolic' type='number' inputRef={register({ required: 'This filed is required', valueAsNumber: true })} />
            <FormHelperText>{errors.diastolic && errors.diastolic.message}</FormHelperText>
          </FormControl>
        </G>
        <G item xs={6}>
          <FormControl>
            <InputLabel htmlFor='date'>Date:</InputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Controller
                as={
                  <KeyboardDatePicker
                    margin='normal'
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    value={new Date(2020, 9, 10)}
                    onChange={e => console.log(e)}
                  />
                }
                id='date'
                name='date'
                rules={{ required: 'Date is required' }}
                control={control}
                defaultValue='20/07/2020'
              />
            </MuiPickersUtilsProvider>
            <FormHelperText>{errors.date && errors.date.message}</FormHelperText>
          </FormControl>
        </G>
        <G item xs={6}>
          <FormControl>
            <InputLabel>Time of day:</InputLabel>
            <Controller
              as={
                <Select 
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
