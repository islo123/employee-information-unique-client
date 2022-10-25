import React, { useEffect} from 'react'
import { FaTrashAlt, FaCheck } from "react-icons/fa"
import { useParams, Link} from "react-router-dom"
import {format } from "date-fns/esm"

export default function UpdateEmployee({
    data=[], 
    updatedName,
    setUpdatedName,
    updatedTeam,
    setUpdatedTeam,
    updatedFirstDay,
    setUpdatedFirstDay,
    updatedLastDay,
    setUpdatedLastDay,
    deleteEmployee,
    updateEmployee}) {

    const  { _id } = useParams()

    const post = data.find(post => post._id === _id)

    useEffect(() => {

        if(post) {
                setUpdatedName(post.name)
                setUpdatedTeam(post.team)
                setUpdatedFirstDay(format(new Date(post.firstDay), 'yyyy-MM-dd'))
                setUpdatedLastDay(format(new Date(post.lastDay), 'yyyy-MM-dd'))
            }
        }, [post, setUpdatedName, setUpdatedTeam, setUpdatedFirstDay, setUpdatedLastDay])

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
                        <input type='text' value={updatedName} onChange={(e) => setUpdatedName(e.target.value)}/>
                        <br className='responsive-br'/>
                        <input type='text' value={updatedTeam} onChange={(e) => setUpdatedTeam(e.target.value)}/>
                        <br className='responsive-br'/>
                        <label>Aloitus päivä</label>
                        <br className='responsive-br'/>
                        <input type='date' value={updatedFirstDay} onChange={(e) => setUpdatedFirstDay(e.target.value)}/>
                        <br className='responsive-br'/>
                        <label>Viimeinen päivä</label>
                        <br className='responsive-br'/>
                        <input type='date' min={format(new Date(post.firstDay), 'yyyy-MM-dd')} value={updatedLastDay} onChange={(e) => setUpdatedLastDay(e.target.value)}/>
                        <br className='responsive-br'/>
                        <button type='submit' onClick={() => { return updateEmployee(post._id)}} className='done-btn'>Hyväksy <FaCheck/></button>
                        <button className='delete-btn' id="delete-btn" onClick={() => {return deleteEmployee(post._id)}}>Poista <FaTrashAlt/></button> 
                    </form>
                </div>

                <div>
                    <Link to="/">Takaisin</Link>     
                </div>  
            </div>
    }
            {
                !post &&
                <div className='deleted-employee'>

                    <p>Työntekijä poistetu</p>
                    <Link className='deleted-post-link' to="/">Pala Työntekijä listan</Link>
                </div>
            }
        
    </>
  )
}
