import styled from 'styled-components';
import Button from '@material-ui/core/Button';


export const Container = styled.footer`
  padding: 30px;
  background-color: #ad1f1f;
  color: white;
  font-size: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  -webkit-box-shadow: 0px 0px 16px 0px rgba(148,148,148,1);
  -moz-box-shadow: 0px 0px 16px 0px rgba(148,148,148,1);
  box-shadow: 0px 0px 16px 0px rgba(148,148,148,1);
`;

export const Link = styled.a`
  color: white;
  text-decoration: none;
`;

export const GithubButton = styled(Button)`
  && {
    color: white;
    padding: 10px;
  }
`;