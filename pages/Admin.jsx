import React , {useState,useEffect}from 'react'
import Table from '../components/Table'
import './Admin.css'

/*C'est ici que je construit la page Admin qui est composée de la table , pour la suppression voir le composant Table  */

function Admin() {
  
    /*initilalisation pour tester le rendu de la page*/
      /*const data = [
      { id: 1, nom: "Nom", prenom: 'Prénom' },
      { id: 2, nom: "Nom", prenom: 'Prénom' },
      { id: 3, nom: "Nom", prenom: 'Prénom' },
      { id: 4, nom: "Nom", prenom: 'Prénom' },
      { id: 5, nom: "Nom", prenom: 'Prénom' },
      { id: 6, nom: "Nom", prenom: 'Prénom' },
      { id: 7, nom: "Nom", prenom: 'Prénom' },
       ];*/

      
       /*j'ai initialisé data aux champs que je veux récup mais qui sont vides*/
       /*pour tester j'ai initialisé avec de vraies valeurs*/
       const [data, setData] = useState( [
        { id: 1, nom: "Nom", prenom: 'Prénom' },
        { id: 2, nom: "Nom", prenom: 'Prénom' },
        { id: 3, nom: "Nom", prenom: 'Prénom' },
        { id: 4, nom: "ahmed", prenom: 'Prénom' },
        { id: 584515151, nom: "Avocado lol lolilol lolilol", prenom: 'Prénom lolilolilol' },
        { id: 15, nom: "Nom", prenom: 'Prénom' },
        { id: 7, nom: "Nom", prenom: 'Prénom' },
         ] 
         
         /*[
        { 
          id: null,
          nom :'',
          prenom:''

        }
       ]*/);
        
       /*j'ai utilisé le useEffect pour modifier la valeur de "data" après le fetch */
       useEffect(() => {
          fetchData();
       }, []);

        /*-----------LINK---------------*/
       /*voici la fonction pour le fetch*/
       const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8000/url/data');/*on doit remplacer l'url*/
            const data = await response.json();
            setData(data);
          } catch (error) {
            console.error('Error:', error);
          }
       };

       /*après une recherche j'ai trouvé que : pour la méthode get, Django REST Framework générera automatiquement des points de 
       terminaison get pour chaque modèle s'il n'est pas spécifié autrement. Ainsi, pour récupérer les données de l'API, 
       il suffit d'appeler l'URL appropriée avec la méthode fetch.*/
       

 return (
    <div className="App">
      <Table data={data} />
    </div>
 )
   
}

export default Admin
