import {format} from "date-fns/esm"
import { Link } from "react-router-dom"



export default function EmployeeList({data}) {

  return (
    <div className="table-body">
      <table className="employee-table employee-thead">
          <thead>
            <tr>
              <th>
                <p>Nimi</p>
              </th>
              <th>
                <p>Tiimi</p>
              </th>
              <th>
                <p>Aloitus päivä</p>
              </th>
              <th>
                <p>Viimeinen päivä</p>
              </th>
            </tr>
          </thead>
      </table>
      {data.map((employee, index) => {
          return (
          <div key={index} className="employee">
            <Link style={{textDecoration: 'none'}} to={`/${employee._id}`}>
              <table className="employee-table employee-hover">
                <tbody className="employee-tbody">
                  <tr>
                    <th>
                      <p id='name' className='name'>{employee.name}</p>                    
                    </th>
                    <th>
                      <p id='name' className='team'>{employee.team}</p>
                    </th>
                    <th>
                      <p id='name' className='firstDay'>{format(new Date(employee.firstDay), 'yyyy-MM-dd')}</p>
                    </th>
                    <th>
                      <p id='name' className='lastDay'>{format(new Date(employee.lastDay), 'yyyy-MM-dd')}</p>
                    </th>
                  </tr>                  
                </tbody>
              </table>
            </Link>
          </div>
          )
      })
      }
    </div>
  )
}