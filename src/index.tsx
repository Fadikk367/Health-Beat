import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from './providers/authContext';
import { MeasurementProvider } from './providers/measurementContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <MeasurementProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MeasurementProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
