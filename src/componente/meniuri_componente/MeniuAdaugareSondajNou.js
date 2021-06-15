import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

class MeniuAdaugareSondajNou extends React.Component{
    handleClick(){
        window.location.href = "adaugare";
    }

    render() {
        return(
            <div className="card shadow-lg rounded-lg min-vw-80 mt-3 mb-3" id={'sondaj'} onClick={this.handleClick} >
                <div className="card-body">
                    <h5>Adauga sondaj nou</h5>
                    <FontAwesomeIcon icon={faPlusCircle} />
                </div>
            </div>
        )
    }
}

export default MeniuAdaugareSondajNou;