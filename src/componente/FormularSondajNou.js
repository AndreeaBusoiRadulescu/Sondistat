import React from 'react';
import MeniuInapoi from "./MeniuInapoi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Firebase from "../Firebase";
import FirebaseInstance from "../Firebase";
import RaspunsDeschis from "./intrebari/RaspunsDeschis";
import RaspunsMultiplu from "./intrebari/RaspunsMultiplu";
import RaspunsSimplu from "./intrebari/RaspunsSimplu";
import SablonRaspunsDeschis from "./sablon_intrebari/SablonRaspunsDeschis";
import SablonRaspunsMultiplu from "./sablon_intrebari/SablonRaspunsMultiplu";
import SablonRaspunsSimplu from "./sablon_intrebari/SablonRaspunsSimplu";

const INTREBARE_RASPUNS_DESCHIS = 1
const INTREBARE_RASPUNS_SIMPLU = 2
const INTREBARE_RASPUNS_MULTIPLU = 3

class FormularSondajNou extends React.Component{

    // 1 -> Raspuns deschis   2 -> Raspuns simplu   3-> Raspuns multiplu

    constructor() {
        super();
        this.state = {
            titlu: "",
            detalii: "",
            intrebari: [],
            tipIntrebareNoua: 0,
            nrIntrebari: 0
        }

        this.handleDetailsChange = this.handleDetailsChange.bind(this);
        this.handleNumeSondajChange = this.handleNumeSondajChange.bind(this);
        this.saveForm = this.saveForm.bind(this)
        this.handleClick = this.handleClick.bind(this)

        this.handleRaspunsDeschis = this.handleRaspunsDeschis.bind(this);
        this.handleRaspunsMultiplu = this.handleRaspunsMultiplu.bind(this);
        this.handleRaspunsSimplu = this.handleRaspunsSimplu.bind(this);

        this.handleIntrebareSalvata = this.handleIntrebareSalvata.bind(this);
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

    handleRaspunsMultiplu() {
        this.setState({tipIntrebareNoua: INTREBARE_RASPUNS_MULTIPLU})
    }

    handleRaspunsDeschis() {
        this.setState({tipIntrebareNoua: INTREBARE_RASPUNS_DESCHIS})
    }

    handleRaspunsSimplu() {
        this.setState({tipIntrebareNoua: INTREBARE_RASPUNS_SIMPLU})
    }

    async handleIntrebareSalvata(intrebare) {
        console.log("HANDLE INTREBARE SALVATA!")
        console.log(intrebare)
        //Am primit intrebarea care poate fi una din cele 3 tipuri.
        //Mai trebuie adaugat campul de ordine fix aici, pentru ca doar parintele stie ordinea noului copil.

        //NEAPARAT AWAIT PT CA NU APUCA SA SE INCREMENTEZE!
        await this.setState((prevState) => ({nrIntrebari: prevState.nrIntrebari + 1}))

        intrebare.ordine = this.state.nrIntrebari

        this.state.intrebari.push(intrebare)
        await this.setState({intrebari: this.state.intrebari})

        //Il adaugam in state-ul principal in array-ul de intrebari
        // await this.setState({intrebari: vechi.push(intrebare)})
        console.log("Intrebari dupa: ")
        console.log(this.state.intrebari)
    }

    saveForm() {
        FirebaseInstance().saveSondaj(this.state.titlu, this.state.detalii, this.state.intrebari).then(() => {
            window.location.href = "sondaje"
        })
        alert("SUNT AICI SA BLOCHEZ MAIN-UL PT A CITI CONSOLA DE DEBUG!")
    }


    renderIntrebareNoua(tip) {
        if (tip === INTREBARE_RASPUNS_DESCHIS) {
            return (
                <div>
                    <SablonRaspunsDeschis onSave={this.handleIntrebareSalvata}/>
                </div>
            )
        } else if (tip === INTREBARE_RASPUNS_MULTIPLU) {
            return (
                <div>
                    <SablonRaspunsMultiplu detalii={this.handleIntrebareSalvata}/>
                </div>
            )
        } else if (tip === INTREBARE_RASPUNS_SIMPLU) {
            return (
                <div>
                    <SablonRaspunsSimplu detalii={this.handleIntrebareSalvata}/>
                </div>
            )
        } else {
            console.log("Nu am putut coverti intrebarea tipul " + tip + " in componenta! Ati selectat ceva?")
            return ''
        }
    }

    render() {
        return(
            <div className={"img-container "} id={"imagineSondaje"}>
                <MeniuInapoi/>
                <div className={"fundal-carduri-model d-flex flex-column"}>
                        <div className={"lista-carduri-model"}>
                            <div className="card shadow-lg rounded-lg min-vw-80 mb-2" id={'sondaj'} >
                                <input type="text" className="numeSondaj m-3" name="nume" placeholder="Nume sondaj" onChange={this.handleNumeSondajChange}/>
                                <textarea name="textarea" className="detaliiSondaj m-3" placeholder="Detalii despre acest sondaj" cols="40" rows="5" onChange={this.handleDetailsChange}/>
                            </div>

                            <div>
                            {/*    INTREBARI EXISTENTE  */}
                                <div className="bg-white p-2 mb-3">
                                    <p className="text-danger"><b>TODO: DE FACUT O ICONITA SAU CEVA DE STERGERE A INTREBARII</b></p>
                                    <p className="text-danger"><b>{"Numar intrebari: " + this.state.nrIntrebari}</b></p>
                                </div>

                                {
                                    this.state.intrebari.map((intrebare, index) => {
                                        // returneaza elementul si paseaza cheia
                                        if (intrebare.tip === INTREBARE_RASPUNS_DESCHIS) {
                                            return (
                                                <div>
                                                    <RaspunsDeschis key={index} detalii={intrebare.detalii}/>
                                                </div>
                                            )
                                        } else if (intrebare.tip === INTREBARE_RASPUNS_MULTIPLU) {
                                            return (
                                                <div>
                                                    <RaspunsMultiplu key={index} detalii={intrebare.detalii}/>
                                                </div>
                                            )
                                        } else if (intrebare.tip === INTREBARE_RASPUNS_SIMPLU) {
                                            return (
                                                <div>
                                                    <RaspunsSimplu key={index} detalii={intrebare.detalii}/>
                                                </div>
                                            )
                                        } else {
                                            console.log("Nu am putut coverti intrebarea " + intrebare + " in componenta!")
                                            return (<div key={index}>Componenta invalida!</div>)
                                        }
                                    })
                                }
                            </div>

                            <div className="card shadow-lg rounded-lg min-vw-80 mb-2" id={'sondaj'}>
                                <div className="card-body">
                                    <h5>Adauga intrebare in sondaj</h5>
                                    {/*<FontAwesomeIcon icon={faPlusCircle} />*/}
                                    <ul className="list-group lista-adaugare-intrebari">
                                        <li className="list-group-item list-group-item-action"
                                            onClick={this.handleRaspunsSimplu}>Raspuns simplu</li>

                                        <li className="list-group-item list-group-item-action"
                                            onClick={this.handleRaspunsMultiplu}>Raspuns multiplu</li>

                                        <li className="list-group-item list-group-item-action"
                                            onClick={this.handleRaspunsDeschis}>Raspuns deschis</li>
                                    </ul>

                                    {
                                        this.renderIntrebareNoua(this.state.tipIntrebareNoua)
                                    }

                                </div>
                            </div>

                            <div className="card element-model shadow-lg rounded-lg min-vw-80 mb-2 mb-4 mt-4" id={'element-lista-model'}>
                                <h6 onClick={this.saveForm}><b>Salveaza sondajul</b></h6>
                            </div>
                        </div>
                </div>
            </div>
        )
    }

}

export default FormularSondajNou;