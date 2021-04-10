import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import profil from "../resurse/profil.png"


class MeniuInapoi extends React.Component{
    handleClick(){
        window.location.href = "sondaje";
    }

    render() {
        return(
            <nav className="navbar mb-2 navbar-expand-lg navbar-light bg-light border-bottom d-flex justify-content-between">
                <button className="btn btn-dark " id="menu-toggle" onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                <img className="photo" src={profil}/>
            </nav>
        )
    }
}

export default MeniuInapoi;