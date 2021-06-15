import IntrebareRaspunsDeschis from "../intrebari_sondaj/IntrebareRaspunsDeschis";
import IntrebareRaspunsMultiplu from "../intrebari_sondaj/IntrebareRaspunsMultiplu";
import IntrebareRaspunsSimplu from "../intrebari_sondaj/IntrebareRaspunsSimplu";
import React from "react";
import {renderVectorIntrebari} from "../FunctiiUtile";

class FormularCompletare extends React.Component {
    constructor() {
        super();

        //Presupunem ca vom obtine intrebarile sondajului din firebase si ar veni sub forma unui json mare cu toate sondajele
        //sa zicem ca ar arata asa:

        //Intrebarile vor avea
        // 1. ordine de afisare (sa o facem?? ma gandeam ca bagam un sort si aia e si poate ne ajuta in alte scenarii.)
        // 2. tip: 1 -> Raspuns deschis   2 -> Raspuns simplu   3-> Raspuns multiplu
        // 3. detalii de implementare pt fiecare tip in parte (difera de la una la alta. Aici se vede puterea NoSQL <3)
        this.titlu = "Sondaj divers"
        this.detalii = "Acest sondaj este realizat de Busoi Andreea si are ca scop realizarea unui exemplu didactic."

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
        this.setState({titlu: this.titlu})
        this.setState({detalii: this.detalii})

    }

    render() {
        return (
            <div className={"img-container"} id={"back"}>
                    <nav className="navbar mb-2 navbar-expand-lg navbar-light border-bottom d-flex justify-content-center" id="model">
                        <a className="titlu" href="login"><b>Sondistat</b></a>
                    </nav>
                <div className={"fundal-carduri-model d-flex flex-column"} style={{backgroundColor: "red"}}>
                    <div className={"lista-carduri-model  rounded-lg"} id={"fundal-model"}>
                        <div className="element-model card shadow-lg rounded-lg" id={'element-lista-model'}>
                            <h1>{this.state.titlu}</h1>
                            <p>{this.state.detalii}</p>
                        </div>

                        {renderVectorIntrebari(this.state.intrebari)}

                        <div className="card element-model shadow-lg rounded-lg min-vw-80 mb-2 mb-4 mt-4" id={'element-lista-model'}>
                            <h6 ><b>Salveaza raspunsul</b></h6>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default FormularCompletare;