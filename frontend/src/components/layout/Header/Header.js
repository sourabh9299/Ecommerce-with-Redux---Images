import React from 'react';
import {ReactNavbar} from "overlay-navbar"
import logo from "../images/logo.png"


function Header (){
    return(
       <ReactNavbar
       logo={logo}
       link1Text="Home"
       link2Text="Products"
       link3Text="Contact"
       link4Text="About"
        navColor1="white"
       link1Url="/"
       link2Url="/Products"
       link3Url="/Contact"
       link4Url="/About"
       nav1alignItems="flex-start"
       nav2alignItems="flex-start"
       nav3alignItems="flex-start"
       nav4alignItems="center"
       link1Margin="1vmax"
       link2Margin="1vmax"
       link3Margin="1vmax"
       link4Margin="1vmax"
       />
    )
}

export default Header