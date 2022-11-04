
import './App.css';
import React from 'react'

import { useState } from 'react';
import { Route, Routes, Link } from "react-router-dom";

import UpdateEmployee from './component/UpdateEmployee';
import AddEmployee from './component/AddEmployee';
import Register from './component/Register';
import Login from './component/Login';
import EmployeeList from './component/EmployeeList';
import { useLogout } from './hooks/useLogout';
import { useAuthContext } from './hooks/useAuthContext';
import Settings from './settings/Settings';
import { FcSettings } from "react-icons/fc"

function App() {
  
  const [msg, setMsg] = useState(false)

  const { logout} = useLogout()
  const { user } = useAuthContext()

  const handleLogout = () => {
    logout();
  }

  return (
    <div className="App">
      <div >
        {
          !user &&
          <ul className='nav'>
            <li><Link style={{textDecoration: 'none'}} to="/login"><h1>Kirjaudu sisään</h1></Link></li>
            <li><Link style={{textDecoration: 'none'}} to="/register"><h1>Rekisteröidy</h1></Link></li>
          </ul>
        }
        {
        user &&
        <div>
          <div className='settings-header'>
            <p className='hello-user'>Terve {user.user.name.toLowerCase()}</p>
            <Link to={`/settings/${user.user._id}/`}>
              <FcSettings className='settings-icon'/>
            </Link>            
          </div>
          <ul className='nav'>
            <li>
              <Link style={{textDecoration: 'none'}} to="/employee"><h1>Työntekijät</h1></Link>
            </li>
            <li>
              <Link style={{textDecoration: 'none'}} to="/employee/add"><h1>Lisää Työntekijät</h1></Link>               
            </li>
            <li>
            <Link style={{textDecoration: 'none'}} onClick={handleLogout} to="/login"><h1 >Kirjaudu ulos</h1></Link>
            </li>
          </ul>
        </div> 
        }
      </div>
      <Routes>

        <Route path="/login" element={ <Login/> }/>

        <Route path="/register" element={ <Register/> }/>

        <Route path="/employee" element={ <EmployeeList/> }/>
        
        <Route path="/employee/:_id" element={ <UpdateEmployee/> }/>

        <Route path="/employee/add" element={ <AddEmployee msg={msg} setMsg={setMsg}/> }/>

        <Route path="/settings/:_id" element={ <Settings/> }/>

      </Routes>
        
  </div>
  );
}

export default App;
