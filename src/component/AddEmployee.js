import React, {useState} from 'react'
import { FaCheck } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import { useEmployeeContext } from '../hooks/useEmployeeContext';
import { api } from '../api/Axios'
import { useAuthContext } from '../hooks/useAuthContext';


export default function AddEmployee({msg, setMsg}) {

    const [newEmployee, setNewEmployee] = useState("")
    const [newTeam, setNewTeam] = useState("")
    const [newFirstDay, setNewFirstDay] = useState("")
    const [newLastDay,setNewLastDay] = useState("")

    const {dispatch} = useEmployeeContext()
    
    const navigate = useNavigate()

    const { user } = useAuthContext();


    const getNewEmployee = async function(e){
        e.preventDefault()

        let res = await api.post("/employee", {name: newEmployee, team: newTeam, firstDay: newFirstDay, lastDay: newLastDay}, {headers: { "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}`}})
            if(newEmployee || newTeam || newFirstDay || newLastDay){
                dispatch({type: 'CREATE_EMPLOYEE', payload: res.data})
            }
        
        setNewEmployee("");
        setNewTeam("");
        setNewFirstDay("")
        setNewLastDay("")
        navigate("/employee")
        window.location.reload();
    }
    return (
        <div>
            <form className='add-form' onSubmit={getNewEmployee}>
                <br className='responsive-br'/>
                <label>Lisää työntekijä</label>
                <br className='responsive-br'/>
                <input required type='text' placeholder='Etu- ja sukunimi' value={newEmployee} onChange={(e) => { return setNewEmployee(e.target.value)}}/>
                <br className='responsive-br'/>
                <input required type='text' placeholder='Tiimi' value={newTeam} onChange={(e) => { return setNewTeam(e.target.value)}}/>
                <br className='responsive-br'/>
                <label> Aloitus päivä</label>
                <br className='responsive-br'/>
                <input required type='date' value={newFirstDay} onChange={(e) => { return setNewFirstDay(e.target.value)}}/>
                <br className='responsive-br'/>
                <label> Viimeinen päivä</label>
                <br className='responsive-br'/>
                <input required type='date' disabled={newFirstDay === "" ? true: false} min={newFirstDay} value={newLastDay} onChange={(e) => { return setNewLastDay(e.target.value)}}/>
                <br className='responsive-br'/>
                <button type='submit' className='add-btn'>Lisää <FaCheck/></button>
            </form>         
        </div>

  )
}