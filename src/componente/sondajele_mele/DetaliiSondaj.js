import React from "react";
import MeniuInapoi from "../meniuri_navigare/MeniuInapoi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

import IntrebareRaspunsSimplu from "../intrebari_sondaj/IntrebareRaspunsSimplu";
import IntrebareRaspunsMultiplu from "../intrebari_sondaj/IntrebareRaspunsMultiplu";
import IntrebareRaspunsDeschis from "../intrebari_sondaj/IntrebareRaspunsDeschis";
import {renderVectorIntrebari} from "../FunctiiUtile";
import MeniuSondaj from "../meniuri_componente/MeniuSondaj";
import Database from "../../Database";
import DatabaseInstance from "../../Database";

class DetaliiSondaj extends React.Component{

    constructor() {
        super();

        //Intrebarile vor avea
        // 1. ordine de afisare (sa o facem?? ma gandeam ca bagam un sort si aia e si poate ne ajuta in alte scenarii.)
        // 2. tip: 1 -> Raspuns deschis   2 -> Raspuns simplu   3-> Raspuns multiplu
        // 3. detalii de implementare pt fiecare tip in parte (difera de la una la alta. Aici se vede puterea NoSQL <3)

        this.state = {
            intrebari: [],
            titlu: "Titlu",
            detalii: "Detalii",
            nrRaspunsuri: null,
            link: "http://model/123"
        }

        this.exportClicked = this.exportClicked.bind(this)
    }

    async componentDidMount() {
        //id-ul sondajului afisat
        this.idSondaj = window.location.pathname.split("/")[2];

        //Luam intrebarile din firebase
        let sondaj = await DatabaseInstance().getSondajById(this.idSondaj)
        this.setState({
            intrebari: sondaj.questions,
            titlu: sondaj.title,
            detalii: sondaj.details,
            link: window.location.origin + "/completare/" + sondaj.id
        })

        //Luam toate completarile sondajului din baza de date
        //Ne vor ajuta la analiza datelor si alte dracovenii
        this.completari = await DatabaseInstance().getCompletariSondaj(this.idSondaj)

        //preluam doar raspunsurile din completari (initial au si id sondaj, id raspuns si alte bazaconii)
        this.raspunsuri = []
        this.completari.forEach((completare) => {
            this.raspunsuri.push(completare.raspunsuri)
        })
        //console.log(completari)
        //Actualizam numarul raspunsurilor/completarilor
        this.setState({
            nrRaspunsuri: this.raspunsuri.length
        })
    }

    exportClicked(e){
        alert(JSON.stringify(this.raspunsuri, null, 2))
    }

    render() {

        let component = () => {}

        return(
            <div className={"img-container"} id={"imagineSondaje"}>
                <MeniuInapoi/>
                <div className={"d-flex flex-column"}>
                    <div className={"lista-carduri-detalii"}>
                        <div className="card shadow-lg rounded-lg min-vw-80 mb-2" id={'sondaj'} >
                            <h1>{this.state.titlu}</h1>
                            <p>Detalii formular</p>
                        </div>

                            <div className={"row justify-content-around"}>
                                <div className="col-md-5 card shadow-lg rounded-lg mb-2" id={'sondaj'} >
                                    <div className="d-flex justify-content-between">
                                        <h6 className="numeSondaj m-3">Numar raspunsuri: {this.state.nrRaspunsuri}</h6>
                                        <FontAwesomeIcon className={"mt-3 mr-3"} icon={faDownload}
                                                         onClick={this.exportClicked}/>
                                    </div>
                                </div>
                                <div className="col-md-5 card shadow-lg rounded-lg mb-2" id={'sondaj'} >
                                    <div className="d-flex justify-content-between">
                                        <h6 className="numeSondaj m-3">Link:</h6>
                                        <a className={"mt-3"} href={this.state.link}>{this.state.link}</a>
                                        <FontAwesomeIcon className={"mt-3 mr-3"} icon={faCopy}/>
                                    </div>
                                </div>
                            </div>



                        <div className={"row"}>
                            <div className={"col intrebari-detalii d-flex flex-column justify-content-start mr-3"} id={"scrolabil-detalii"}>
                                {
                                    renderVectorIntrebari(this.state.intrebari)
                                }
                            </div>
                            <div className="col grafice card shadow-lg rounded-lg min-vw-80 mr-3">
                                <div>Meniu generare grafic</div>
                                <br/>
                                <div>-grafic 1</div>
                                <div>-grafic 2</div>
                                <br/>
                                <button className={"m-3"}>Genereaza!</button>
                                <br/>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

export default DetaliiSondaj;