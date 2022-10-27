import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthProvider';
import { EmployeeContextProvider } from './context/EmployeeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route exact path="*" element={ <EmployeeContextProvider><AuthContextProvider><App /></AuthContextProvider></EmployeeContextProvider> }>
      </Route>    
    </Routes>

    </BrowserRouter>      
  </React.StrictMode>  
);

