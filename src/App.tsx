import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import { Home, Register, Login, Statistics } from './views';


const App: React.FC = () => {
  return (
    <>
      <header>
        <nav>
          <h1>Health Beat</h1>
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/register'>Register</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/statistics'>Statistics</NavLink></li>
          </ul>
        </nav>
      </header>
      <main>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/statistics' component={Statistics}/>
        </Switch>
      </main>
      <footer>
        Health Beat / 2020 / Adrian Furman / TI
      </footer>
    </>
  );
}

export default App;
