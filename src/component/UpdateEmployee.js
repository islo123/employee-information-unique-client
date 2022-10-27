import React, { useEffect, useState} from 'react'
import { FaTrashAlt, FaCheck } from "react-icons/fa"
import { useParams, Link, useNavigate} from "react-router-dom"
import {format } from "date-fns"
import { useEmployeeContext } from '../hooks/useEmployeeContext';
import { api } from '../api/Axios'
import { useAuthContext } from '../hooks/useAuthContext';

export default function UpdateEmployee() {

    const [updatedName, setUpdatedName] = useState("")
    const [updatedTeam, setUpdatedTeam] = useState("")
    const [updatedFirstDay, setUpdatedFirstDay] = useState("")
    const [updatedLastDay, setUpdatedLastDay] = useState("")

    const navigate = useNavigate()

    const { user } = useAuthContext();

    const {employees, dispatch} = useEmployeeContext()

    const  { _id } = useParams()

    const post = employees && employees.find(post => post._id === _id)

    useEffect(() => {
        if(post) {
                setUpdatedName(post.name)
                setUpdatedTeam(post.team)
                setUpdatedFirstDay(format(new Date(post.firstDay), 'yyyy-MM-dd'))
                setUpdatedLastDay(format(new Date(post.lastDay), 'yyyy-MM-dd'))
            }
        }, [post, setUpdatedName, setUpdatedTeam, setUpdatedFirstDay, setUpdatedLastDay, employees])

    const updateEmployee = async function(_id){
      
        let res = await api.put(`/employee/${_id}`, {_id, name: updatedName, team: updatedTeam, firstDay: updatedFirstDay, lastDay: updatedLastDay}, {headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}`}})
        if (updatedName | updatedTeam | updatedFirstDay | updatedLastDay) {
            dispatch({type: 'UPDATE_EMPLOYEE', payload: employees.map(post => post._id === _id? { ...res.data } : post)})
        }
        navigate('/employee')
    }

    const deleteEmployee = async function(_id){
        if (!user) {
          return
        }
    
        const res = await api.delete(`/employee/${_id}`, {headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}`}})
        dispatch({type: 'DELETE_EMPLOYEE', payload: res.data})
      }

  return (
    <>
        {
            post &&
                <div>
                    <div className='employee-update'>
                        <p id='name' className='update-name'>Valittu työntekijä <br/> {post.name}</p>
                        <p id='name' className='update-name'>Tiimi <br/> {post.team}</p>
                        <p id='name' className='update-name'>Aloitus päivä <br/> {format(new Date(post.firstDay), 'yyyy-MM-dd')}</p>
                        <p id='name' className='update-name'>Viimeinen päivä <br/> {format(new Date(post.lastDay), 'yyyy-MM-dd')}</p>
                
                        </div><div>
                        
                        <form onSubmit={(e) => e.preventDefault()}>
                            <br className='responsive-br'/>
                            <input type='text' placeholder='Etu- ja sukunimi' value={updatedName} onChange={(e) => setUpdatedName(e.target.value)}/>
                            <br className='responsive-br'/>
                            <input type='text' placeholder='Tiimi' value={updatedTeam} onChange={(e) => setUpdatedTeam(e.target.value)}/>
                            <br className='responsive-br'/>
                            <label> Aloitus päivä</label>
                            <br className='responsive-br'/>
                            <input type='date' value={updatedFirstDay} onChange={(e) => setUpdatedFirstDay(e.target.value)}/>
                            <br className='responsive-br'/>
                            <label> Viimeinen päivä</label>
                            <br className='responsive-br'/>
                            <input type='date' min={format(new Date(post.firstDay), 'yyyy-MM-dd')} value={updatedLastDay} onChange={(e) => setUpdatedLastDay(e.target.value)}/>
                            <br className='responsive-br'/>
                            <button type='button' onClick={() => { return updateEmployee(post._id)}} className='done-btn'>Hyväksy <FaCheck/></button>
                            <button className='delete-btn' id="delete-btn" onClick={() => {return deleteEmployee(post._id)}}>Poista <FaTrashAlt/></button> 
                        </form>
                    </div>

                    <div>
                        <Link to="/employee">Takaisin</Link>     
                    </div>  
                </div>
        }
            {
                !post && 
                    <div className='deleted-employee'>
                        <p>Työntekijä poistetu</p>
                        <Link className='deleted-post-link' to="/employee">Pala Työntekijä listan</Link>
                     </div>
            }

           
    </>
  )
}
