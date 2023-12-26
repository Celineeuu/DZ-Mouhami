import React, { useState} from 'react';
import Row from './Row';
import './Table.css';


/*ce composant mappe les lignes qui contiennent les infos des avocats + ici je supprime les lignes donc les avocats */

function Table({ data }) {

/*ça c'est pour récupérer les données entrées en paramètres (props) et les mettre à jour à la suppression  avec setList*/
 const [list, setList] = useState(data);

 /*ça c'est pour la recherche , pour récup après là où le user clique*/
 const [search, setSearch] = useState('');
   
 

 /*C'est ici que je supprime les lignes qui correspondent aux avocats */

 const deleteRow = async (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
     /*-----------LINK---------------*/
    /*c'est ici que commenece le link , dans le fetch je suppose que que l'url 
    correspondera à un avocat selon son id  */
    try {
      await fetch(`/api/data/${id}/`, { 
        method: 'DELETE',
      });
      console.log(id)
    } catch (error) {
      console.error('Error:', error);
    }
 };


 /*ça c'est pour la recherche c'est un code front */
 const filteredRows = list.filter((item) =>
 item.nom.toLowerCase().startsWith(search.toLowerCase()) ||
 item.prenom.toLowerCase().startsWith(search.toLowerCase()) ||
 item.id.toString().startsWith(search)
 );

 return (
    <div className="container-admin">
      <input
        type="text"
        placeholder="Chercher"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table">
        {filteredRows.map((item) => (
          <Row key={item.id} data={item} deleteRow={() => deleteRow(item.id)} />
        ))}
      </table>
    </div>
 );
}

export default Table;





/*----------Code initial sans link ----------- */


/*import React ,{ useState }  from 'react'
import Row from './Row';
import './Table.css'


function Table({data}) {

   
    const [list, setList] = useState(data);
    const [search, setSearch] = useState('');
   
    const deleteRow = (index) => {
       const newList = [...list];
       newList.splice(index, 1);
       setList(newList);
    };
   
    const filteredRows = list.filter((item) =>

       item.nom.toLowerCase().includes(search.toLowerCase()) ||
       item.prenom.toLowerCase().includes(search.toLowerCase())
    );

    

 return (
    <div className="container">
      <input
        type="text"
        placeholder="Chercher"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table">
      {filteredRows.map((item, index) => (
        <Row key={index} data={item} deleteRow={() => deleteRow(index)} />
      ))}
      </table>
    </div>
 )
}

export default Table*/
