import React from "react";
import profil from "../resurse/profil.png";

class MeniuLogOut extends React.Component{

    render() {
        return(
            <nav className="navbar mb-2 navbar-expand-lg navbar-light bg-light border-bottom d-flex justify-content-between">
                <a className="nav-link" href="login">Log out</a>
                <img className="photo" src={profil}/>
            </nav>
        )
    }
}

export default MeniuLogOut;