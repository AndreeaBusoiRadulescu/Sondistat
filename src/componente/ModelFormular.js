import MeniuInapoi from "./MeniuInapoi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCopy} from "@fortawesome/free-solid-svg-icons";
import RaspunsDeschis from "./intrebari/RaspunsDeschis";
import RaspunsMultiplu from "./intrebari/RaspunsMultiplu";
import RaspunsSimplu from "./intrebari/RaspunsSimplu";
import React from "react";
import profil from "../resurse/profil.png";

const INTREBARE_RASPUNS_DESCHIS = 1
const INTREBARE_RASPUNS_SIMPLU = 2
const INTREBARE_RASPUNS_MULTIPLU = 3

class ModelFormular extends React.Component {
    constructor() {
        super();

        //Presupunem ca vom obtine intrebarile sondajului din firebase si ar veni sub forma unui json mare cu toate sondajele
        //sa zicem ca ar arata asa:

        //Intrebarile vor avea
        // 1. ordine de afisare (sa o facem?? ma gandeam ca bagam un sort si aia e si poate ne ajuta in alte scenarii.)
        // 2. tip: 1 -> Raspuns deschis   2 -> Raspuns simplu   3-> Raspuns multiplu
        // 3. detalii de implementare pt fiecare tip in parte (difera de la una la alta. Aici se vede puterea NoSQL <3)
        this.titlu = "Sondaj divers"
        this.detalii = "Acest sondaj este realizat de Busoi Andreea si are ca scop realizarea unui exemplu didactic"

        this.intrebarileMele = {
            "id": 5,
            "ownerId": 10,
            "intrebari": [
                {
                    "ordine": 1,
                    "tip": 1,
                    "detalii": {
                        "titlu": "Scrieti numele cainelui dumneavoastra",
                        "numarMaxCuvinte": 500
                    }
                },
                {
                    "ordine": 2,
                    "tip": 2,
                    "detalii": {
                        "titlu": "Cat de des va spalati pe cap?",
                        "optiuni": [
                            "Mereu",
                            "Niciodata",
                            "Asa si asa"
                        ]
                    }
                },
                {
                    "ordine": 3,
                    "tip": 3,
                    "detalii": {
                        "titlu": "Alegeti mai multe legume care va plac",
                        "optiuni": [
                            "Castravete",
                            "Vanata",
                            "Varza",
                            "Ridichie"
                        ]
                    }
                }
            ]
        }

        this.state = {
            titlu : "Titlu",
            detalii : "Detalii",
            intrebari: []
        }
    }


    componentDidMount() {
        this.setState({intrebari: this.intrebarileMele.intrebari})
    }

    handleClick(){
        window.location.href = "sondaje";
    }

    render() {
        return (
            <div className={"img-container "} id={"grayback"}>
                <div className={"sondaje d-flex flex-column"}>
                    <div className={"listaSondaje"}>
                        <nav className="navbar mb-2 navbar-expand-lg navbar-light bg-light border-bottom d-flex justify-content-center">
                            <a href="login"></a>
                        </nav>

                        <div className="card shadow-lg rounded-lg mb-4"id={'sondaj'}>
                            <h1>{this.state.titlu}</h1>
                            <p>{this.state.detalii}</p>
                        </div>

                        {/*De facut logica de randare in functie de ce intrebari avem*/}
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

                        <input type="submit" className="card" id="salvareRaspuns" value="Salveaza raspunsul"/>

                    </div>
                </div>
            </div>
        )
    }
}

export default ModelFormular;