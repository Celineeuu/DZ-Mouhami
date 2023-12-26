import React from 'react'
import { FaTrash } from 'react-icons/fa';
import './Row.css'


/*Composant pour structurer la ligne qui contient les informations */
function Row({ data, deleteRow }) {
    return (
        <div className="row">
         <span className='data-id'>{data.id}</span>
          <span className='data-nom'>{data.nom}</span>
          <span className='data-prenom'>{data.prenom}</span>
          <button className='profil-btn'>
            <a className='profil-url' href="/url/profil">Profil</a></button>
          <button onClick={deleteRow} className='delete-btn'><FaTrash/></button>

        </div>
     )
}

export default Row


