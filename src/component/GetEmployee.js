import React from 'react'
import '../App.css';
import ManageEmployee from "./ManageEmployee";


export default function GetEmployee({data, setData}) {
    return (
      <div>
  
        {data.length === 0? <h3 className='no-employee' style={{marginLeft: "3rem", borderBottom: "solid 2px black"}}>Ei työntekijöitä</h3> : <ManageEmployee data={data} setData={setData}/>}    
  
        <div className='employee-calculator'>
          <div>
            <h3 style={{color: "ButtonShadow"}}>{data.length +  " työntekijä" }</h3>
          </div>
        </div>
      </div>
    );
}
