import React , {useState}from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import logo from '../Assets/logo.svg'
import {ImCross} from "react-icons/im"
import{FaBars} from "react-icons/fa6"


const Navbar = () => {

 //logique pour le bouton de connexion
 const navigate = useNavigate();

  const handleClick = () => {
    navigate('/connexion');
  };


  //logique por la navbar responsive
  const [menuOpen, setMenuOpen] = useState(false);
   
    const toggleMenu = () => {
       setMenuOpen(!menuOpen);}
    
  return (

    <>
   <nav className="navbar">
  
     <img src={logo} alt="" className='logo' />


     <div className="links">
     <div className='link'>

     {/*<a href="/acceuil" >Accueil</a>
     <a href="/acceuil" >A propos</a>
     <a href="/acceuil" >Contacts</a>
     */}

          <Link to="/">Accueil</Link>
          <Link to="/services">À propos</Link>
          <Link to="/contact">Contact</Link>
     </div>


     <button className='btn' onClick={handleClick}>Se connecter</button>

     
     </div>


     <button className="navbar-toggle" onClick={toggleMenu}>
     {menuOpen ? <ImCross/> : <FaBars/>}
     </button>

    
    </nav>


  {menuOpen && (
      
  <div className="links-res">

  <div className='link'>
  <a href="/acceuil" >Accueil</a>
  <a href="/acceuil" >A propos</a>
  <a href="/acceuil" >Contacts</a>
  </div>
  <button className='btn'>Se connecter</button>
  </div>
    )}

</>
   
  );
};

export default Navbar;