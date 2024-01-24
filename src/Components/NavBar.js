import React from "react";
import logo from "../Assets/logo.svg"
import "./navbar.css"
import { useParams } from 'react-router-dom';

const NavBar = () => {
    const {connected_id, avocat_id} = useParams()
    const btn = connected_id || avocat_id
    ? "Se déconnecter" 
    : "Se connecter"
    return(
        <div className="navBar">
           <img alt="logo" src={logo}></img>
           <div className="elements">
                <p className="elem">Accueil</p>
                <p className="elem">Services</p>
                <p className="elem">Avocats</p>
                <p className="elem">Contacts</p>
           </div>
           <button className="btn">{btn}</button>
        </div>
    )
}


export default NavBar;