import React from 'react';

import { Container, Link, GithubButton } from './Footer.css';
import GitHubIcon from '@material-ui/icons/GitHub';


const Footer = () => {
  return (
    <Container>
      Health Beat / 2020 / Adrian Furman / TI
      <Link href="">
        <GithubButton endIcon={<GitHubIcon htmlColor='white'/>}>source code</GithubButton>
      </Link>
    </Container>
  )
}

export default Footer;
