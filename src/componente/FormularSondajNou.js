import React from 'react';
import MeniuInapoi from "./MeniuInapoi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";

class FormularSondajNou extends React.Component{
    handleNumeSondajChange(event){
        this.setState({materie: event.target.value});
    }

    handleClick(){
        alert("DE ADAUGAT DINAMIC!")
    }

    render() {
        return(
            <div className={"img-container "} id={"imagineSondaje"}>
                <div className={"sondaje d-flex flex-column"}>
                    <MeniuInapoi/>
                    <div className={"listaSondaje"}>
                        <div className="card shadow-lg rounded-lg min-vw-80 mb-2" id={'sondaj'} >
                            <input type="text" className="numeSondaj m-3" name="nume" placeholder="Nume sondaj" onChange={this.handleNumeSondajChange}/>
                            <textarea name="textarea" className="detaliiSondaj m-3" placeholder="Detalii despre acest sondaj" cols="40" rows="5" onChange={this.handleContinutChange}/>
                        </div>

                        <div className="card shadow-lg rounded-lg min-vw-80 mb-2" id={'sondaj'} onClick={this.handleClick} >
                            <div className="card-body">
                                <h5>Adauga intrebare in sondaj</h5>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </div>
                        </div>

                        <input type="submit" className="card" id={'submit'} value="Salveaza formular!"/>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default FormularSondajNou;