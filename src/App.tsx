import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home, Register, Login, Statistics } from 'views';
import GlobalStyles, { Layout, Header, HeaderContent, Main, Footer } from 'Layout';
import { Navigation, PrivateRoute } from 'components';
import NetworkDetector from 'components/NetworkDetector';
import { AuthContext } from 'providers/authContext';


const App: React.FC = () => {
  const { isAuthentificated } = useContext(AuthContext);

  return (
    <Layout>
      <GlobalStyles />
      <Header>
        <HeaderContent>
          <h1>Health Beat</h1>
          <Navigation isAuthentificated={isAuthentificated}/>
        </HeaderContent>
      </Header>
      <Main>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <PrivateRoute path='/statistics' isAuthentificated={isAuthentificated} component={Statistics}/>
        </Switch>
      </Main>
      <Footer>
        Health Beat / 2020 / Adrian Furman / TI
      </Footer>
    </Layout>
  );
}

export default NetworkDetector(App);


