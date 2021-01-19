import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { AuthContext } from 'providers/authContext';

import { TextInput, ErrorMessageBox, Form, FormTitle, LoginButton, FlexRow, ServerErrorMessage } from './LoginForm.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

interface LoginFormData {
  email: string,
  password: string;
}


const LoginForm: React.FC = () => {
  const { loginUser } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm<LoginFormData>();
  const [serverError, setServerError] = useState('');
  const history = useHistory();

  const handleLoginFormSubmit = handleSubmit(async ({ email, password }) => {
    try {
      await loginUser(email, password);
      history.push('/statistics/chart');
    } catch(err) {
      setServerError(err);
    }
  })
  console.log(errors);

  return (
    <Form onSubmit={handleLoginFormSubmit}>
      <FormTitle>Zaloguj się</FormTitle>
      <FormControl>
        <InputLabel color='secondary' htmlFor='email'>Email</InputLabel>
        <TextInput type="text" name='email' id='email' inputRef={register({ required: 'Email is required' })}/>
        <ErrorMessageBox>{errors.email && errors.email.message}</ErrorMessageBox>
      </FormControl>

      <FormControl>
        <InputLabel color='secondary' htmlFor='password'>Password</InputLabel>
        <TextInput type="text" name='password' id='password' inputRef={register({ required: 'Password is required' })}/>
        <ErrorMessageBox>{errors.password && errors.password.message}</ErrorMessageBox>
      </FormControl>
      <FlexRow>
        <ServerErrorMessage>{serverError}</ServerErrorMessage>
        <LoginButton type="submit">Login</LoginButton>
      </FlexRow>
      <p>You dont have an account? <Link to='/register'>Register now here</Link></p>
    </Form>
  )
}

export default LoginForm;
