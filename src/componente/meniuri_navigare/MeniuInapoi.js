import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import profil from "../../resurse/profil.png"
import DatabaseInstance from "../../Database";


class MeniuInapoi extends React.Component{
    handleClick(){

        //window.location.href = "sondaje"; Asta nu merge pentru ca modifica doar ultimul cuvant de dupa slash si devine /detalii/sondaje
        window.location.href = window.location.origin + "/sondaje"; // => localhost.../sondaje

    }

    render() {
        return(
            <nav className="navbar mb-2 navbar-expand-lg navbar-light bg-light border-bottom d-flex justify-content-between">
                <button className="btn btn-dark " id="menu-toggle" onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                <div className="d-flex flex-row ">
                    <img className="photo" src={DatabaseInstance().getCurrentUserPhotoURL()}/>
                    <p className="m-auto pl-2">{DatabaseInstance().getCurrentUser().name}</p>
                </div>
            </nav>
        )
    }
}

export default MeniuInapoi;