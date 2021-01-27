import React, { useContext, useState } from 'react';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { AnimatedButton } from 'components';
import { Form, FormTitle, TextInput, ErrorMessageBox, FlexRow, ServerErrorMessage } from './RegisterForm.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { AuthContext } from 'providers/authContext';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  password: string;
}

const YEAR_IN_MILISECCONDS = 1000*60*60*24*365;


const RegisterForm: React.FC = () => {
  const { registerUser } = useContext(AuthContext);
  const { register, handleSubmit, errors, control } = useForm<RegisterFormData>();
  const [serverError, setServerError] = useState('');
  const history = useHistory();

  const handleRegisterFormSubmit = handleSubmit(async (registerData) => {
    try {
      await registerUser({ ...registerData, birthDate: registerData.birthDate.toISOString().substring(0, 10) });
      history.push('/statistics/chart');
    } catch(err) {
      setServerError(err);
    }
  })

  const processBirthDateError = (error: FieldError) => {
    switch(error.type) {
      case 'required':
        return 'Birth date is required'
      case 'isPastDate':
        return 'Birth date cannot be in future'
      case 'is13YearsOld':
        return 'Minimal age required to use this app is 13'
    }
  }

  const inputRegister = {
    firstName: register({
      required: 'First name is required',
      minLength: { value: 2, message: 'Minimum 2 characters' },
      maxLength: { value: 16, message: 'Maximum 16 characters' },
    }),
    lastName: register({
      required: 'Last name is required',
      minLength: { value: 2, message: 'Minimum 2 characters' },
      maxLength: { value: 16, message: 'Maximum 16 characters' },
    }),
    email: register({
      required: 'Email is required',
      minLength: { value: 4, message: 'Minimum 4 characters' },
      pattern: { value: /(.+)@(.+){2,}\.(.+){2,}/, message: 'Invalid email format'}
    }),
    password: register({
      required: 'Password is required',
      minLength: { value: 8, message: 'Minimum 8 characters' },
      maxLength: { value: 16, message: 'Maximum 16 characters' },
    })
  }

  return (
    <Form onSubmit={handleRegisterFormSubmit}>
      <FormTitle>Register now!</FormTitle>
      <FlexRow>
        <FormControl>
          <InputLabel color='secondary'>First name</InputLabel>
          <TextInput name='firstName' inputRef={inputRegister.firstName}/>
          <ErrorMessageBox>{errors.firstName && errors.firstName.message}</ErrorMessageBox>
        </FormControl>
        <FormControl>
          <InputLabel color='secondary'>Last name</InputLabel>
          <TextInput name='lastName' inputRef={inputRegister.lastName}/>
          <ErrorMessageBox>{errors.lastName && errors.lastName.message}</ErrorMessageBox>
        </FormControl>
      </FlexRow>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Controller
          as={
            <KeyboardDatePicker
              margin='none'
              disableToolbar
              variant="inline"
              label="Birth date"
              format="MM/dd/yyyy"
              helperText={errors.birthDate && processBirthDateError(errors.birthDate)}
              value={new Date()}
              onChange={e => console.log(e)}
            />
          }
            id='date'
            name='birthDate'
            rules={{
              required: 'Last name is required',
              validate: {
                isPastDate: (date: Date) => date.getTime() < Date.now(),
                is13YearsOld: (date: Date) => (date.getTime() < (Date.now() - 13*YEAR_IN_MILISECCONDS)),
              }
            }}
            control={control}
            defaultValue={new Date()}
          />
        </MuiPickersUtilsProvider>
        <FormControl>
          <InputLabel color='secondary'>Email</InputLabel>
          <TextInput name='email' inputRef={inputRegister.email}/>
          <ErrorMessageBox>{errors.email && errors.email.message}</ErrorMessageBox>
        </FormControl>
        <FormControl>
          <InputLabel color='secondary'>Password</InputLabel>
          <TextInput type='password' name='password' inputRef={inputRegister.password}/>
          <ErrorMessageBox>{errors.password && errors.password.message}</ErrorMessageBox>
        </FormControl>
        <FlexRow>
          <ServerErrorMessage>{serverError}</ServerErrorMessage>
          <AnimatedButton type='submit'>Submit</AnimatedButton>
      </FlexRow>
    </Form>
  )
}

export default RegisterForm;
