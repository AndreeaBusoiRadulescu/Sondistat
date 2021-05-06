import React from 'react';
import MeniuInapoi from "./MeniuInapoi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Firebase from "../Firebase";
import FirebaseInstance from "../Firebase";

class FormularSondajNou extends React.Component{

    constructor() {
        super();
        this.state={
            titlu: "",
            detalii: "",
            intrebari: ""
        }
        this.handleDetailsChange = this.handleDetailsChange.bind(this);
        this.handleNumeSondajChange = this.handleNumeSondajChange.bind(this);
        this.saveForm = this.saveForm.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleNumeSondajChange(event){
        this.setState({titlu: event.target.value});
    }

    handleDetailsChange(event) {
        this.setState({detalii: event.target.value});
    }

    handleClick(){
        alert("DE ADAUGAT DINAMIC!")
    }

    saveForm() {
        FirebaseInstance().saveSondaj(this.state.titlu, this.state.detalii, this.state.intrebari).then(() => {
            window.location.href = "sondaje"
        })
    }

    render() {
        return(
            <div className={"img-container "} id={"imagineSondaje"}>
                <div className={"fundal-carduri d-flex flex-column"}>
                    <MeniuInapoi/>
                    <div className={"lista-carduri"}>
                        <div className="card shadow-lg rounded-lg min-vw-80 mb-2" id={'sondaj'} >
                            <input type="text" className="numeSondaj m-3" name="nume" placeholder="Nume sondaj" onChange={this.handleNumeSondajChange}/>
                            <textarea name="textarea" className="detaliiSondaj m-3" placeholder="Detalii despre acest sondaj" cols="40" rows="5" onChange={this.handleDetailsChange}/>
                        </div>

                        <div className="card shadow-lg rounded-lg min-vw-80 mb-2" id={'sondaj'} onClick={this.handleClick} >
                            <div className="card-body">
                                <h5>Adauga intrebare in sondaj</h5>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </div>
                        </div>

                        <input type="submit" className="card" id={'submit'} value="Salveaza formular!" onClick={this.saveForm}/>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default FormularSondajNou;