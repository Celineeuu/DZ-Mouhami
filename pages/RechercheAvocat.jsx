import React, { useEffect, useState } from 'react';
import AvocatCard from '../components/AvocatCard';
import './RechercheAvocat.css';
import image from '../Assets/photo_avocat.png'


//Si tu veux essayer une version qui communique avec le backend et linker , j'ai trouvé ça en charchant jsp si ça peut t'etre utile
//modifier juste la fonction filtrerAvocat  
//specialité , adresse sont des variables qui rècupèrent les options où le user clique 

/*
const fetchFilteredAvocats = async (specialité, adresse) => {
  try {
    const response = await fetch(`URL_DU_BACKEND/filtrerAvocats?specialité=${specialité}&adresse=${adresse}`);
    const data = await response.json();
    setFilteredAvocats(data);
    setCurrentPage(1);
  } catch (error) {
    console.error('Erreur lors de la récupération des données filtrées du backend:', error);
  }
};

const filtrerAvocats = () => {
  fetchFilteredAvocats(specialité, adresse, searchTerm);
};
*/


/*------DEBUT--------*/

function RechercheAvocat() {


  /*---je rècupère les options de la spécialité----*/
  //on doit fetch

  const [optionSpecialité , setOptionSpecialité] = useState([
    {specialité : 'Droit pénal'} ,
    {specialité : 'Droit de la famille'} ,
    {specialité : 'Droit civil'} ,
    {specialité : 'Constitution'} ,
    
    
  ])

  //useEffect()


  /*---je rècupère les options de l'adresse ---*/
  //on doit fetch
  const [optionAdresse, setOptionAdresse] = useState([
    {adresse: 'Alger'} ,
    {adresse: 'Béjaia'} ,
    {adresse: 'Skikda'} ,
    {adresse: 'Tizi-Ouzou'} ,
    
  ])

  //useEffect()


  /*----je dois récupérer les données des avocats ici (J'ai initialisé pour tester)----*/
  //on doit fetch
 const [avocatData, setAvocatData] = useState([
 // Les données ici...
     {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike',
      adresse:'Sidi Yahia ,Alger', 
      note : 2 , 
      sumnote:20} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Sidi Ahmed , Béjaïa', 
      note :'0' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit civil , Droit des familles ', 
      nom:'Ross', 
      prenom: 'celine', 
      adresse:'Tizi-Ouzou', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Constitution', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'hvuhvuhhcufhv,skikda', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike',
      adresse:'Sidi Yahia ,Alger', 
      note :'2' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Dihia', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Sidi Ahmed , Béjaia', 
      note :'0' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit civil , Droit des familles ', 
      nom:'Ross', 
      prenom: 'Lilya', 
      adresse:'Tizi-Ouzou', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Constitution', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'hvuhvuhhcufhv,alger', 
      note :'5' , 
      sumnote:'19'},
      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Amira',
      adresse:'Sidi Yahia ,Alger', 
      note :'2' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,
     
      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Aida',
      adresse:'Sidi Yahia ,Alger', 
      note :'2' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Sidi Ahmed , bejaia', 
      note :'0' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit civil , Droit des familles ', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Tizi-Ouzou', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Constitution', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'hvuhvuhhcufhv,skikda', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike',
      adresse:'Sidi Yahia ,Alger', 
      note :'2' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Sidi Ahmed , Bejaia', 
      note :'0' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit civil , Droit des familles ', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Tizi-Ouzou', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Constitution', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'hvuhvuhhcufhv,alger', 
      note :'5' , 
      sumnote:'20'},
      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike',
      adresse:'Sidi Yahia ,Alger', 
      note :'2' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,
      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike',
      adresse:'Sidi Yahia ,Alger', 
      note :'2' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Sidi Ahmed , Bejaia', 
      note :'0' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit civil , Droit des familles ', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Tizi-Ouzou', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Constitution', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'hvuhvuhhcufhv,skikda', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike',
      adresse:'Sidi Yahia ,Alger', 
      note :'2' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Sidi Ahmed , Bejaia', 
      note :'0' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit civil , Droit des familles ', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Tizi-Ouzou', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Constitution', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'hvuhvuhhcufhv,alger', 
      note :'5' , 
      sumnote:'20'},
      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike',
      adresse:'Sidi Yahia ,Alger', 
      note :'2' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike',
      adresse:'Sidi Yahia ,Alger', 
      note :'2' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Sidi Ahmed , Bejaia', 
      note :'0' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit civil , Droit des familles ', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Tizi-Ouzou', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Constitution', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'hvuhvuhhcufhv,skikda', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike',
      adresse:'Sidi Yahia ,Alger', 
      note :'2' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Sidi Ahmed , Bejaia', 
      note :'0' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit civil , Droit des familles ', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Tizi-Ouzou', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Constitution', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'hvuhvuhhcufhv,alger', 
      note :'5' , 
      sumnote:'20'},
      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike',
      adresse:'Sidi Yahia ,Alger', 
      note :'2' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,


      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Sidi Ahmed , Bejaia', 
      note :'0' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit civil , Droit des familles ', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Tizi-Ouzou', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Constitution', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'hvuhvuhhcufhv,alger', 
      note :'5' , 
      sumnote:'20'},
      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike',
      adresse:'Sidi Yahia ,Alger', 
      note :'2' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Sidi Ahmed , Bejaia', 
      note :'0' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit civil , Droit des familles ', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'Tizi-Ouzou', 
      note :'5' , 
      sumnote:'20'},

      {id:'1',
      image :{image},
      specialité :'Constitution', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'hvuhvuhhcufhv,alger', 
      note :'5' , 
      sumnote:'20'},
      {id:'1',
      image :{image},
      specialité :'Droit de la famille', 
      nom:'Ross', 
      prenom: 'Mike',
      adresse:'Sidi Yahia ,Alger', 
      note :'2' , 
      sumnote:'20'} ,

      {id:'1',
      image :{image},
      specialité :'Droit pénal', 
      nom:'Ross', 
      prenom: 'Mike', 
      adresse:'El Harrach ,Alger', 
      note :'4' , 
      sumnote:'20'} ,




    
 ]);

 //useEffect()
 


 /*-----Traitement-------*/

  //je récupère les avocats filtrés en fonction des critères de spécialité et d'adresse et j'initialisé aux données de base
  const [filteredAvocats, setFilteredAvocats] = useState(avocatData);


 /*-----ici c'est pour récupérer là ou le user clique-----*/
 const [specialité, setSpecialite] = useState('');
 const [adresse, setAdresse] = useState('');

 //récup les termes entrés pour la recherche dans la search-bar
 const [searchTerm, setSearchTerm] = useState('');



 /*----ça c'est la foction pour les filtres elle s'exécute lorsqu'on clique sur le boutton filtrer---- */

    /*version améliorée*/
    const filtrerAvocats = () => {
      
      const Filtres = avocatData.filter((avocat) =>
        (specialité === '' || avocat.specialité.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(specialité.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) &&
        (adresse === '' || avocat.adresse.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(adresse.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) 
       );
    
      setFilteredAvocats(Filtres);
      setCurrentPage(1);
    };
    
    

 /*-------ici c'est la fonction pour réinitialiser les données de la page lorsqu'on clique sur le boutton réinitialiser------*/

 const reinitialiserFiltres = () => {
   setSpecialite('');
   setAdresse('');
   setFilteredAvocats(avocatData);
    setCurrentPage(1);
 };




 // ici pour la search bar ajout d'un gestionnaire d'événements pour mettre à jour le terme de recherche
 const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};

//ici c'est la fonction qui traite la recherche dans la search bar 

const handleSearch = () => {
  const term = searchTerm.toLowerCase();
  const Filtres = avocatData.filter((avocat) =>
    Object.values(avocat)
      .filter((value) => typeof value === 'string' && value !== null && value !== undefined) // Ajout de la vérification de null et undefined
      .some((value) =>
        typeof value === 'string' &&
        value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
      )
  );
  setFilteredAvocats(Filtres);
  setCurrentPage(1);
};



// ici pour la serch bar ajout d'un gestionnaire d'événements pour déclencher la recherche lorsque la touche "Entrée" est pressée
const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleSearch();
    setSearchTerm('')
  }
};



 /*---fonctions pour la pagination-----*/
 const itemsPerPage = 9;
 const [currentPage, setCurrentPage] = useState(1);
 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentAvocats = filteredAvocats.slice(indexOfFirstItem, indexOfLastItem);
 const npage = Math.ceil(filteredAvocats.length/itemsPerPage)
 

 function changepage(id){
  setCurrentPage(id)
  
 }

 function prevPageGroup() {
  const newRangeStart = Math.max(1, getPageRange()[0] - 5);
  setCurrentPage(newRangeStart);
}

function nextPageGroup() {
  const newRangeStart = Math.min(getPageRange()[0] + 5, npage);
  setCurrentPage(newRangeStart);
}

 const getPageRange = () => {
  const rangeStart = Math.max(1, (Math.floor((currentPage - 1) / 5) * 5) + 1);
  const rangeEnd = Math.min(rangeStart + 4, npage);

  return Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => i + rangeStart);
};

/*------fin des fonctions---- */







 /*-----Ici commence la structure de la page-----*/
 return (
  <div className="container-recherche">


    {/* ici c'est la barre de recherche */}
    <input
        className='avocat-search'
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />


    {/*ici je construis les filtres*/}
    <div className="container-filtre">

      {/*ici c'est le filtre de la spécialité on a utilisé un select avec des options*/}
      <div className="select-container">
        <label htmlFor="specialité">Spécialité :</label>

        <select
          id="specialité"
          value={specialité}
          onChange={(e) => setSpecialite(e.target.value)}
        >
          <option value="">Toutes</option>
          {/* Mettre ici toutes les spécialités */}
          {optionSpecialité.map((sp) => (
            <option value={sp.specialité}>{sp.specialité}</option>
          ))}
         
        </select>
      </div>
      


      {/*ici c'est le filtre de l'adresse on a utilisé un select avec des options*/}
      <div className="select-container">
        <label htmlFor="adresse">Adresse :</label>
        <select
          id="adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
        >
          <option value="">Toutes</option>
          {/* Mettre ici toutes les spécialités */}
          {optionAdresse.map((ad) => (
            <option value={ad.adresse}>{ad.adresse}</option>
          ))}

        </select>
      </div>
      

      {/*ici on a nos deux bouttons "filtrer" et "réinitialiser"*/}
      <div className='container-btn'>
      <button  className ="filter-btn" onClick={filtrerAvocats}>Filtrer</button>
      <button className ="reset-btn" onClick={reinitialiserFiltres}>Réinitialiser</button>
      </div>

    </div>





{/*ici je commence à maper mes avocats dans des cards en leur entrants les données récupérées en haut dans avocatData */}
    

<div className="container-cards">
  {currentAvocats.length > 0 ? (
    currentAvocats.map((avocat) => (
      <AvocatCard
        key={avocat.id}
        image={avocat.image}
        specialité={avocat.specialité}
        nom={avocat.nom}
        prenom={avocat.prenom}
        adresse={avocat.adresse}
        note={avocat.note}
        sumnote={avocat.sumnote}
      />
    ))
  ) : (
    <p className="search-err">Aucun résultat ne correspond à votre recherche.</p>
  )}
</div>


 {/*pagination*/}
  <nav>
  <ul className='pagination'>
   {currentPage >1 && (
    <li className='page-item'>
      <button href='#' className='page-link-pre' onClick={prevPageGroup}>Précédent</button>
    </li>
   )}

    {getPageRange().map((n, i) => (
      <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
        <button className='page-link' onClick={() => changepage(n)}>{n}</button>
      </li>
    ))}

    {currentPage < npage && (
      <li className='page-item'>
        <button className='page-link-next' onClick={nextPageGroup}>Suivant</button>
      </li>
    )}
  </ul>
</nav>

  </div>
);
}

export default RechercheAvocat;







