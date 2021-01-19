import React from 'react'
import { Redirect, Route } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthentificated: boolean;
  path: string;
  component: React.FunctionComponent;
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthentificated, component: Component, ...rest}) => {
  return (
    <Route 
      {...rest} 
      render={props => 
        isAuthentificated 
        ? <Component />
        : <Redirect to='/login'/>
      }
    />
  )
}

export default PrivateRoute;
