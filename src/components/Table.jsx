import React ,{ useState }  from 'react'
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

export default Table
