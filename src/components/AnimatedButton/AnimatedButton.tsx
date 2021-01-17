import styled from 'styled-components';
import Button from '@material-ui/core/Button';


const AnimatedButton = styled(Button)`
  && {  
    padding: 7px;
    font-size: 1.2em;
    width: 200px;
    color: white;
    background-color: #ad1f1f;
    transition: transform 0.1s ease-in-out;
    align-self: flex-end;

    &:hover {
      transform: scale(1.03);
      background-color: #ad1f1f;
    }

    &:active {
      transform: scale(1.01);
      background-color: #ad1f1f;
    }
  }
`;

export default AnimatedButton;