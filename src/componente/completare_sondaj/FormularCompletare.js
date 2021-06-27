import IntrebareRaspunsDeschis from "../intrebari_sondaj/IntrebareRaspunsDeschis";
import IntrebareRaspunsMultiplu from "../intrebari_sondaj/IntrebareRaspunsMultiplu";
import IntrebareRaspunsSimplu from "../intrebari_sondaj/IntrebareRaspunsSimplu";
import React from "react";
import {renderVectorIntrebari} from "../FunctieAfisare";
import DatabaseInstance from "../../Database";

class FormularCompletare extends React.Component {
    constructor() {
        super();

        //Presupunem ca vom obtine intrebarile sondajului din firebase si ar veni sub forma unui json mare cu toate sondajele
        //sa zicem ca ar arata asa:

        //Intrebarile vor avea
        // 1. ordine de afisare (sa o facem?? ma gandeam ca bagam un sort si aia e si poate ne ajuta in alte scenarii.)
        // 2. tip: 1 -> Raspuns deschis   2 -> Raspuns simplu   3-> Raspuns multiplu
        // 3. detalii de implementare pt fiecare tip in parte (difera de la una la alta. Aici se vede puterea NoSQL <3)

        this.onSave = this.onSave.bind(this);

        //Acest vector va tine minte toate componentele specifice intrebarilor
        //Este asemenea unui vector de obiecte din celelalte limbaje de programare
        //Mai departe pot folosi metodele acestor obiecte, cum ar fi metoda de preluat inputul utilizatorului
        //Este foarte frumos asa, pentru ca fiecare componenta isi vede de treaba ei (isi preia cum vrea ce completeaza un utilizator)
        //Si eu doar le intreb frumos ce s-a completat in ele
        //Deoarece din motive de optimizare React nu creaza si referinte catre obiectul componentelor
        //Va fi nevoie sa fac referinte explicit catre aceste componente
        //Daca am 10 componente, fac 10 referinte pe care le voi pasa catre fiecare componenta cu ref=Referinta
        //https://reactjs.org/docs/refs-and-the-dom.html

        this.state = {
            titlu : "Titlu",
            detalii : "Detalii",
            intrebari: []
        }
    }


    async componentDidMount() {
        //id-ul sondajului afisat
        this.idSondaj = window.location.pathname.split("/")[2];

        //Luam intrebarile din firebase
        let sondaj = await DatabaseInstance().getSondajById(this.idSondaj)


        //Acum stiu cate intrebari are sondajul
        //Cream referinte catre componente in functie de numarul intrebarilor pe care il avem
        this.componente = []
        for(let i = 0; i < sondaj.questions.length; i++){
            this.componente.push(React.createRef())
        }
        //Mai departe referintele din this.componente for fi folosite in functia renderVectorIntrebari din render()
        //unde va asigna fiecarei componente cate o referinta specifica atunci cand sunt randate
        //REZULTAT: de acum ma pot referi la intrebarea 3 ca this.componente[2].current (referinta e in proprietatea current -_-)


        this.setState({
            intrebari: sondaj.questions,
            titlu: sondaj.title,
            detalii: sondaj.details
        })
    }

    async onSave() {
        //In momentul trimiterii unei intrebari, vreau sa ma asigur ca toate intrebarile sunt completate
        //Voi trece prin toate intrebarile si voi apela metoda getRaspuns() care este implementata in fiecare tip
        //de intrebare in parte.
        //Daca utilizatorul nu a completat nimic, raspunusul va fi null
        //Altfel va fi fie un text (raspuns deschis), fie un o optiune (raspuns simplu), fie un vector de optiuni (raspuns mutliplu)
        //Daca toate intrebarile sunt raspunse, voi merge pe incredere si voi salva toate raspunsurile in baza de date asa cum le primesc
        //de la fiecare componenta in parte

        //Verificam daca raspunsurile sunt diferite de null (i.e. sunt raspunse)
        let raspunsuriValide = true
        //Trebuie salvat ca hashmap pentru ca intervine o problema cu baza de date
        //cand se salveaza array in array.... asa ca faci hashmap in stilul asta:
        //{0: raspuns1, 1:raspuns2, 2:[1, 2, 3], ...}
        let hashMapRaspunsuri = {}
        for (let i = 0; i < this.componente.length; i++) {
            let raspuns = this.componente[i].current.getRaspuns()

            if (raspuns === null) {
                raspunsuriValide = false
            }

            //Daca raspunsul e valid, il bagam la galeata
            hashMapRaspunsuri[i] = raspuns
        }

        if (raspunsuriValide === false) {
            alert("Una sau mai multe intrebari au erori de validare!")
            return
        }

        await DatabaseInstance().saveCompletareSondaj(this.idSondaj, hashMapRaspunsuri)
        alert("Raspuns salvat cu succes! Multumim pentru completare!")
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

                        {renderVectorIntrebari(this.state.intrebari, this.componente)}

                        <div className="card element-model shadow-lg rounded-lg min-vw-80 mb-2 mb-4 mt-4" id={'element-lista-model'}>
                            <h6 onClick={this.onSave}><b>Salveaza raspunsul</b></h6>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default FormularCompletare;