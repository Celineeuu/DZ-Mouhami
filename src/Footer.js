import React from "react";
import logo from "./Assets/logo.svg"
import email from "./Assets/envelope.png"
import fb from "./Assets/fb.png"
import insta from "./Assets/instagram.png"
import twitter from "./Assets/twitter.png"
import linkedin from "./Assets/linkedin.png"
import "./footer.css"

const Footer = () => {
    return(
        <div className="footer">
          <div className="element1">
            <div className="leftSide">
                <img alt="aaaa" src={logo}></img>
                <div className="email">
                    <img alt="aaaa" src= {email}></img>
                    <p>dz-mouhami@gmail.com</p>
                </div>
                <div className="socials">
                    <img alt="aaaa" src={fb}></img>
                    <img alt="aaaa" src={insta}></img>
                    <img alt="aaaa" src={twitter}></img>
                    <img alt="aaaa" src={linkedin}></img>
                </div>
            </div>
            <div className="rightSide">
                <button className="bouton2">Chercher un avocat</button>
                <button className="buton">S'inscrire</button>
            </div>
          </div>
          <p className="copyright">Copyright © 2023 DZ MOUHAMI . All rights Reserved</p>
        </div>
    )
}


export default Footer;