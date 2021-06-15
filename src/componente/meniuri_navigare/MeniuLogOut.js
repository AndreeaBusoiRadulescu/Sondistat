import React from "react";
import profil from "../../resurse/profil.png";
import DatabaseInstance from "../../Database";

class MeniuLogOut extends React.Component{

    render() {
        return(
            <nav className="navbar mb-2 navbar-expand-lg navbar-light bg-light border-bottom d-flex justify-content-between">
                <a className="nav-link" href="login">Log out</a>
                <div className="d-flex flex-row ">
                    <img className="photo" src={DatabaseInstance().getCurrentUserPhotoURL()}/>
                    <p className="m-auto pl-2">{DatabaseInstance().getCurrentUser().name}</p>
                </div>
            </nav>
        )
    }
}

export default MeniuLogOut;