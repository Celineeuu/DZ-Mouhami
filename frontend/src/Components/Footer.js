import React from "react";
import logo from "../Assets/logo.svg"
import email from "../Assets/envelope.png"
import fb from "../Assets/fb.png"
import insta from "../Assets/instagram.png"
import twitter from "../Assets/twitter.png"
import linkedin from "../Assets/linkedin.png"
import "./footer.css"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Footer = ({ connected_id, avocat_id }) => {
    const navigate = useNavigate();
    const btn = connected_id && connected_id != "Connexion" && connected_id != "Inscription" && connected_id != "Recherche"
    ? "Se déconnecter" 
    : "Se connecter"

    const redbtn = () => {
        if(btn == "Se connecter"){
            navigate(`/Connexion`)
        }else {
            navigate("/")
        }
    }
    const avbtn = () => {
        if(connected_id){
            navigate(`/${connected_id}/Recherche`)
        }else {
            navigate("/Recherche")
        }
    }
    return(
        <div className="footer">
          <div className="element1">
            <div className="leftSide">
                <img src={logo}></img>
                <div className="email">
                    <img src= {email}></img>
                    <p>dz-mouhami@gmail.com</p>
                </div>
                <div className="socials">
                    <img src={fb}></img>
                    <img src={insta}></img>
                    <img src={twitter}></img>
                    <img src={linkedin}></img>
                </div>
            </div>
            <div className="rightSide">
                <button className="bouton2" onClick={avbtn}>Chercher un avocat</button>
                <button className="buton" onClick={redbtn}>{btn}</button>
            </div>
          </div>
          <p className="copyright">Copyright © 2023 DZ MOUHAMI . All rights Reserved</p>
        </div>
    )
}


export default Footer;