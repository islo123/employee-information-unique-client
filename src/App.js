
import './App.css';
import React from 'react'

import { useEffect, useState } from 'react';
import { FaSyncAlt } from "react-icons/fa";
import { Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

import SingleEmplyee from './component/SingleEmplyee';
import GetEmployee from './component/GetEmployee';
import AddEmployee from './component/AddEmployee';
import { api } from "./api/Axios"

function App() {

  const [data, setData] = useState([])

  const [updatedName, setUpdatedName] = useState("")
  const [updatedTeam, setUpdatedTeam] = useState("")
  const [updatedFirstDay, setUpdatedFirstDay] = useState("")
  const [updatedLastDay, setUpdatedLastDay] = useState("")

  const [newEmployee, setNewEmployee] = useState("")
  const [newTeam, setNewTeam] = useState("")
  const [newFirstDay, setNewFirstDay] = useState("")
  const [newLastDay,setNewLastDay] = useState("")

  const [isLoading, setIsLoading] = useState(true)   
  
  const [msg, setMsg] = useState(false)

  const navigate = useNavigate()


  const onPageOpenGetEmployee = async function (){ 
    api.get("/").then(function(res){
      setData(res.data.employees)
      setIsLoading(false)

    }).catch(function(error){
      console.log(error)
  })
}

  useEffect(() => {
    onPageOpenGetEmployee()
  }, [JSON.stringify(data)])

  const getNewEmployee = async function(e){
    e.preventDefault()

    let res = await api.post("/", {name: newEmployee, team: newTeam, firstDay: newFirstDay, lastDay: newLastDay})
      if(newEmployee || newTeam || newFirstDay || newLastDay){
          setData(function(data){
          return [...data, res.data]
      }) 
    }
    setNewEmployee("");
    setNewTeam("");
    setNewFirstDay("")
    setNewLastDay("")
    setMsg(true)
    setTimeout(()=> {
      navigate("/")
      setMsg(false)
    }, 2000)
  }

  const deleteEmployee = async function(_id){
    await api.delete(`/${_id}`)

    const filter = data.filter(function(employee){
      return employee._id !== _id
    })

    setData(filter)
  }
  
  const updateEmployee = async function(_id){
    
    const updatedPost = {_id, name: updatedName, team: updatedTeam, firstDay: updatedFirstDay, lastDay: updatedLastDay} 

    let res = await api.put(`/${_id}`, updatedPost)

    setData(data.map(post => post._id === _id? { ...res.data } : post))
  }

  if(isLoading){
    return (
      <div className='loading'><FaSyncAlt className='rotate-loading'/></div>
    )
  }
  
  return (
    <div className="App">
      <div >
        <ul className='nav'>
          <li>
            <Link style={{textDecoration: 'none'}} to="/"><h1>Työntekijät</h1></Link>
          </li>
          <li>
            <Link style={{textDecoration: 'none'}} to="/add"><h1>Lisää Työntekijät</h1></Link>               
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={ <GetEmployee data={data} setData={setData}/> }/>

        <Route path=":_id" element={ <SingleEmplyee
          data={data}
          updatedName={updatedName} setUpdatedName={setUpdatedName}
          updatedTeam={updatedTeam} setUpdatedTeam={setUpdatedTeam}
          updatedFirstDay={updatedFirstDay} setUpdatedFirstDay={setUpdatedFirstDay}
          updatedLastDay={updatedLastDay} setUpdatedLastDay={setUpdatedLastDay}
          deleteEmployee={deleteEmployee}
          updateEmployee={updateEmployee}
          /> }/>

        <Route path="/add" element={ <AddEmployee
          newEmployee={newEmployee} setNewEmployee={setNewEmployee}
          newTeam={newTeam} setNewTeam={setNewTeam}
          newFirstDay={newFirstDay} setNewFirstDay={setNewFirstDay}
          newLastDay={newLastDay} setNewLastDay={setNewLastDay}
          getNewEmployee={getNewEmployee}
          msg={msg} setMsg={setMsg}
        /> }/>

      </Routes>
  </div>
  );
}

export default App;
