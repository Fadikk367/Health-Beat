import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
`;

export const FormTitle = styled.h2`
  font-size: 2.2em;
  font-weight: 800;
  letter-spacing: 1px;
  color: #ad1f1f;
  margin-bottom: 15px;
`;

export const TextInput = styled(Input)`
  && {  
    input {
      font-size: 1.3em;
      padding: 7px 0;
    }

    label {
      font-size: 1.2em;
      margin-bottom: 10px;
    }

    &::after {
      border-bottom: 3px solid #ad1f1f;
    }

    label.Mui-focused {
      color: #ad1f1f;
    }
  }
`;


export const ErrorMessageBox = styled(FormHelperText)`
  && {
    font-size: 0.8em;
    padding: 3px 0;
    height: 20px;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ServerErrorMessage = styled.div`
  font-size: 1.1em;
  color: #ad1f1f;
`;