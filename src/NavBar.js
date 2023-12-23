import React from "react";
import logo from "./Assets/logo.svg"
import "./navbar.css"

const NavBar = () => {
    return(
        <div className="navBar">
           <img src={logo} alt=""></img>
           <div className="elements">
                <p className="elem">Accueil</p>
                <p className="elem">Services</p>
                <p className="elem">Avocats</p>
                <p className="elem">Contacts</p>
           </div>
           <button className="btn">S'inscrire</button>
        </div>
    )
}


export default NavBar;