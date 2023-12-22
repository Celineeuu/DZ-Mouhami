import React from 'react'
import Table from '../components/Table'
import './Admin.css'

function Admin() {
  
    
      const data = [
      { id: 1, nom: "Nom", prenom: 'Prénom' },
      { id: 2, nom: "Nom", prenom: 'Prénom' },
      { id: 3, nom: "Nom", prenom: 'Prénom' },
      { id: 4, nom: "Nom", prenom: 'Prénom' },
      { id: 5, nom: "Nom", prenom: 'Prénom' },
      { id: 6, nom: "Nom", prenom: 'Prénom' },
      { id: 7, nom: "Nom", prenom: 'Prénom' },
       ];

 return (
    <div className="App">
      <Table data={data} />
    </div>
 )
   
}

export default Admin
