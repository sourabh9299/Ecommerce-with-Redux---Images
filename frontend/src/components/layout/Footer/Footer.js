import React from "react";
import "../Footer/foot.css"
import playStore from "../images/playstore.png"


function Footer(){
    return(
        <div id="foot-css">
        <div id="foot-1">
        <h4>
            Download our App
        </h4>
        <img src={playStore} alt="location not found" />
        </div>
        <div id="foot-2">
            <h3>
            Ecommerce Platform for toys
            </h3>
            <p>Copyright </p>
        </div>
        <div id="foot-3">
            <h3> Contact us </h3>
            <ul>
                <li><a href="#container">FaceBook</a></li>
                <li><a href="#container">Instagram</a></li>
                <li><a href="#container">Linkdin</a></li>
            </ul>
            </div>
        </div>
    )
}

export default Footer