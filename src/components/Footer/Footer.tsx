import React from 'react';

import { Container, Link, GithubButton } from './Footer.css';
import GitHubIcon from '@material-ui/icons/GitHub';


const Footer = () => {
  return (
    <Container>
      Health Beat / 2020 / Adrian Furman / TI
      <Link href="https://github.com/Fadikk367/Health-Beat">
        <GithubButton endIcon={<GitHubIcon htmlColor='white'/>}>
          documentation and source code
        </GithubButton>
      </Link>
    </Container>
  )
}

export default Footer;
