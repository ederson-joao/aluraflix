import React from "react";
import './index.css';
import logo from '../../img/logo.png';

function Header() {
    return (
        <header>
            <img className="logo" src={logo} alt="Logo"></img>
            <div className="buttonsHeader">
                <button>HOME</button>
                <button>NOVO VÍDEO</button>
            </div>
        </header>
    )
}

export default Header;