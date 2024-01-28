import React from "react";
import logo from "../Assets/logo.svg"
import "./navbar.css"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const NavBar = ({ connected_id, avocat_id }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const btn = connected_id && connected_id != "Connexion" && connected_id != "Inscription" && connected_id != "Recherche"
    ? t("Se déconnecter") 
    : t("Se connecter")

    const accueil = () => {
        if(connected_id){
            navigate(`/${connected_id}`)
        }else {
            navigate("/")
        }
    }
    const avocats = () => {
        if(connected_id){
            navigate(`/${connected_id}/Recherche`)
        }else {
            navigate("/Recherche")
        }
    }
    const redbtn = () => {
        if(btn == "Se connecter"){
            navigate(`/Connexion`)
        }else {
            navigate("/")
        }
    }
    return(
        <div className="navBar">
           <img alt="logo" src={logo}></img>
           <div className="elements">
                <p className="elem" onClick={accueil}>{t("Accueil")}</p>
                <p className="elem">{t("Services")}</p>
                <p className="elem" onClick={avocats}>{t("Avocats")}</p>
                <p className="elem" >{t("Contacts")}</p>
           </div>
           <button className="btn" onClick={redbtn}>{btn}</button>
        </div>
    )
}


export default NavBar;