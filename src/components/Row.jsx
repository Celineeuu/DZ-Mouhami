import React from 'react'
import { FaTrash } from 'react-icons/fa';
import './Row.css'

function Row({ data, deleteRow }) {
    return (
        <div className="row">
         <span className='data'>{data.id}</span>
          <span className='data'>{data.nom}</span>
          <span className='data'>{data.prenom}</span>
          <button className='profil-btn'>Profil</button>
          <button onClick={deleteRow} className='delete-btn'><FaTrash/></button>



           { /* essai avec un tableau */
           /*<tr className='row'>
            <td className='data'>{data.id}</td>
            <td className='data'>{data.nom}</td>
            <td className='data'>{data.prenom}</td>
            <td><button className='profil-btn'>Profil</button> </td>
            <td><button onClick={deleteRow} className='delete-btn'><FaTrash/></button></td>
            
          </tr>*/}


        </div>
     )
}

export default Row
