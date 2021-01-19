import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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


const RegisterForm: React.FC = () => {
  const { registerUser } = useContext(AuthContext);
  const { register, handleSubmit, errors, control } = useForm<RegisterFormData>();
  const [serverError, setServerError] = useState('');
  const history = useHistory();

  const handleRegisterFormSubmit = handleSubmit(async (registerData) => {
    try {
      await registerUser({ ...registerData, birthDate: registerData.birthDate.toISOString().substring(0, 10) });
      history.push('/statistics');
    } catch(err) {
      setServerError(err);
    }
  })

  return (
    <Form onSubmit={handleRegisterFormSubmit}>
      <FormTitle>Register now!</FormTitle>
      <FlexRow>
        <FormControl>
          <InputLabel>First name</InputLabel>
          <TextInput name='firstName' inputRef={register}/>
          <ErrorMessageBox>{errors.firstName && errors.firstName.message}</ErrorMessageBox>
        </FormControl>
        <FormControl>
          <InputLabel>Last name</InputLabel>
          <TextInput name='lastName' inputRef={register}/>
          <ErrorMessageBox>{errors.lastName && errors.lastName.message}</ErrorMessageBox>
        </FormControl>
      </FlexRow>
      <FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Controller
                as={
                  <KeyboardDatePicker
                    margin='normal'
                    disableToolbar
                    variant="inline"
                    label="Birth date"
                    format="MM/dd/yyyy"
                    value={new Date()}
                    onChange={e => console.log(e)}
                  />
                }
                id='date'
                name='birthDate'
                rules={{ required: 'Date is required' }}
                control={control}
                defaultValue={new Date()}
              />
            </MuiPickersUtilsProvider>
          {/* <ErrorMessageBox></ErrorMessageBox> */}
        </FormControl>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <TextInput name='email' inputRef={register}/>
          <ErrorMessageBox>{errors.email && errors.email.message}</ErrorMessageBox>
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <TextInput name='password' inputRef={register}/>
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
