import React from 'react'
import { FaCheck } from "react-icons/fa"

export default function AddEmployee({
    getNewEmployee,
    newEmployee, 
    setNewEmployee,
    newTeam, 
    setNewTeam,
    newFirstDay, 
    setNewFirstDay,
    newLastDay,
    setNewLastDay,
    msg}) {

    return (
        <div>
            {msg? <h3>Työntekijä lisätty</h3> : ""} 
            <form className='add-form' onSubmit={getNewEmployee}>
                <br className='responsive-br'/>
                <label>Lisää työntekijä</label>
                <br className='responsive-br'/>
                <input required type='text' placeholder='Koko nimi' value={newEmployee} onChange={(e) => { return setNewEmployee(e.target.value)}}/>
                <br className='responsive-br'/>
                <input required type='text' placeholder='Tiimi' value={newTeam} onChange={(e) => { return setNewTeam(e.target.value)}}/>
                <br className='responsive-br'/>
                <label>Aloitus päivä</label>
                <br className='responsive-br'/>
                <input required type='date' value={newFirstDay} onChange={(e) => { return setNewFirstDay(e.target.value)}}/>
                <br className='responsive-br'/>
                <label>Viimeinen päivä</label>
                <br className='responsive-br'/>
                <input required type='date' disabled={newFirstDay === "" ? true: false} min={newFirstDay} value={newLastDay} onChange={(e) => { return setNewLastDay(e.target.value)}}/>
                <br className='responsive-br'/>
                <button type='submit' className='add-btn'>Lisää <FaCheck/></button>
            </form>            
        </div>

  )
}