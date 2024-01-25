import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import './Admin.css';

function Admin() {
  const [data, setData] = useState([
    { id: 1, nom: "Nom", prenom: 'Prénom' },
    { id: 2, nom: "Nom", prenom: 'Prénom' }
  ]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAvocats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/liste_avocats/");
        const responseData = await response.json();
        console.log(responseData)
        if (typeof responseData === 'object' && responseData !== null) {
          setData(responseData);
          console.log(data)
          console.log(data)
        } else {
          console.error("La réponse du serveur ne contient pas les données attendues.");
        }
      } catch (error) {
        console.error("Erreur lors du fetch des avocats: ", error);
      }
    };

    fetchAvocats();
  }, [data]);


  const handleDelete = async (id) => {
    try {
      const updatedData = data.filter(avocat => avocat.id !== id);
      setData([{ ...data[0], updatedData }]);

      await fetch(`http://127.0.0.1:8000/api/supprimer_avocat/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredRows = data.filter((item) =>
    item.nom.toLowerCase().startsWith(search.toLowerCase()) ||
    item.prenom.toLowerCase().startsWith(search.toLowerCase()) ||
    item.id.toString().startsWith(search)
  );

  return (
    <div className="app">
      <div className="container-admin">
        <input
          type="text"
          placeholder="Chercher"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="table">
          {filteredRows.map((item) => (
            <div key={item.id} className="row">
              <span className='data-id'>{item.id}</span>
              <span className='data-nom'>{item.nom}</span>
              <span className='data-prenom'>{item.prenom}</span>
              <button className='profil-btn'>
                <a className='profil-url' href={`/url/profil/${item.id}`}>Profil</a>
              </button>
              <button onClick={() => handleDelete(item.id)} className='delete-btn'><FaTrash /></button>
            </div>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Admin;
