import React from "react";
import MeniuInapoi from "./MeniuInapoi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import RaspunsSimplu from "./intrebari/RaspunsSimplu";
import RaspunsMultiplu from "./intrebari/RaspunsMultiplu";
import RaspunsDeschis from "./intrebari/RaspunsDeschis";

const INTREBARE_RASPUNS_DESCHIS = 1
const INTREBARE_RASPUNS_SIMPLU = 2
const INTREBARE_RASPUNS_MULTIPLU = 3

class DetaliiSondaj extends React.Component{

    constructor() {
        super();

        //Presupunem ca vom obtine intrebarile sondajului din firebase si ar veni sub forma unui json mare cu toate sondajele
        //sa zicem ca ar arata asa:

        //Intrebarile vor avea
        // 1. ordine de afisare (sa o facem?? ma gandeam ca bagam un sort si aia e si poate ne ajuta in alte scenarii.)
        // 2. tip: 1 -> Raspuns deschis   2 -> Raspuns simplu   3-> Raspuns multiplu
        // 3. detalii de implementare pt fiecare tip in parte (difera de la una la alta. Aici se vede puterea NoSQL <3)

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

        let component = () => {}

        return(
            <div className={"img-container "} id={"imagineSondaje"}>
                <div className={"sondaje d-flex flex-column"}>
                    <MeniuInapoi/>

                    <div className={"listaSondaje"}>
                        <div className="card shadow-lg rounded-lg min-vw-80 mb-2" id={'sondaj'} >
                            <h1>Titlu</h1>
                            <p>Detalii formular</p>
                        </div>
                        <div className={"sondaje d-flex justify-content-between"}>
                            <div className="card shadow-lg rounded-lg min-vw-80 mb-2" id={'sondaj'} >
                                <h5 className="numeSondaj m-3">Numar raspunsuri:</h5>
                            </div>
                            <div className="card shadow-lg rounded-lg min-vw-80 mb-2 mr-3 " id={'sondaj'} >
                                <div className="d-flex justify-content-between">
                                    <h5 className="numeSondaj m-3">Link:</h5>
                                    <FontAwesomeIcon icon={faCopy}/>
                                </div>
                            </div>
                        </div>

                        {/*De facut logica de randare in functie de ce intrebari avem*/}
                        {
                            this.state.intrebari.map((intrebare, index) => {
                                // returneaza elementul si paseaza cheia
                                if (intrebare.tip === INTREBARE_RASPUNS_DESCHIS) {
                                    return (
                                        <div className={"mb-5"}>
                                            <RaspunsDeschis key={index} detalii={intrebare.detalii}/>
                                        </div>
                                    )
                                } else if (intrebare.tip === INTREBARE_RASPUNS_MULTIPLU) {
                                    return (
                                        <div className={"mb-5"}>
                                            <RaspunsMultiplu key={index} detalii={intrebare.detalii}/>
                                        </div>
                                    )
                                } else if (intrebare.tip === INTREBARE_RASPUNS_SIMPLU) {
                                    return (
                                        <div className={"mb-5"}>
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
                </div>
            </div>
        )
    }
}

export default DetaliiSondaj;