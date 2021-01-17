import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormTitle = styled.h3`
  font-size: 1.7em;
  font-weight: 300;
  margin-top: 20px;
`;

export const FlexRow = styled.div`
  display: flex;
  /* justify-content: space-between; */

  input {
    flex: 1;
  }
`;

export const G = styled(Grid)`
  && {
    display: flex;
    flex-direction:column;
  }
`;