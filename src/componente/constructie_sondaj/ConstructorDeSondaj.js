import React from 'react';
import MeniuInapoi from "../meniuri_navigare/MeniuInapoi";
import DatabaseInstance from "../../Database";
import SablonCreareRaspunsDeschis from "./sablon_creare_intrebari/SablonCreareRaspunsDeschis";
import SablonCreareRaspunsMultiplu from "./sablon_creare_intrebari/SablonCreareRaspunsMultiplu";
import SablonCreareRaspunsSimplu from "./sablon_creare_intrebari/SablonCreareRaspunsSimplu";
import IntrebareRaspunsDeschis from "../intrebari_sondaj/IntrebareRaspunsDeschis";
import IntrebareRaspunsMultiplu from "../intrebari_sondaj/IntrebareRaspunsMultiplu";
import IntrebareRaspunsSimplu from "../intrebari_sondaj/IntrebareRaspunsSimplu";
import {faArrowDown, faArrowUp, faListAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const INTREBARE_RASPUNS_DESCHIS = 1
const INTREBARE_RASPUNS_SIMPLU = 2
const INTREBARE_RASPUNS_MULTIPLU = 3

class ConstructorDeSondaj extends React.Component{

    constructor() {
        super();

        //Aici sunt informatiile de baza despre meniul de creare
        this.state = {
            titlu: "",
            detalii: "",
            intrebari: [],
            tipIntrebareNoua: 0,
            eroareValidare: ""
        }

        this.handleDetailsChange = this.handleDetailsChange.bind(this);
        this.handleNumeSondajChange = this.handleNumeSondajChange.bind(this);
        this.saveForm = this.saveForm.bind(this)
        this.handleRaspunsDeschis = this.handleRaspunsDeschis.bind(this);
        this.handleRaspunsMultiplu = this.handleRaspunsMultiplu.bind(this);
        this.handleRaspunsSimplu = this.handleRaspunsSimplu.bind(this);
        this.handleIntrebareSalvata = this.handleIntrebareSalvata.bind(this);
        this.stergeIntrebare = this.stergeIntrebare.bind(this);
    }

    //Alegere titlu pt sondaj
    handleNumeSondajChange(event){
        this.setState({titlu: event.target.value});
    }

    //Alegere detalii text pt sondaj
    handleDetailsChange(event) {
        this.setState({detalii: event.target.value});
    }

    //A selectat faptul ca vrea sa faca o intrebare cu raspuns multiplu
    handleRaspunsMultiplu() {
        this.setState({tipIntrebareNoua: INTREBARE_RASPUNS_MULTIPLU})
    }

    //A selectat faptul ca vrea sa faca o intrebare cu raspuns deschis
    handleRaspunsDeschis() {
        this.setState({tipIntrebareNoua: INTREBARE_RASPUNS_DESCHIS})
    }

    //A selectat faptul ca vrea sa faca o intrebare cu raspuns simplu
    handleRaspunsSimplu() {
        this.setState({tipIntrebareNoua: INTREBARE_RASPUNS_SIMPLU})
    }

    //Aici utilizatorul a apasat pe butonul de save din sablonul copil
    //Toate informatiile precum intrebarea, tipul intrebarii, raspunsurile posibile etc se afla in parametrul 'intrebare'
    //Apelul nu este realizat de aici!! Este realizat din elementele copil: SablonRaspunsDeshis, SablonCreareRaspunsMultiplu si SablonCreareRaspunsSimplu
    //Actiunea de click din copil vrem sa o primim aici in parinte deoarece nu vrem sa repetam codul de salvare a unei intrebari de 3 ori.
    //Dar si pt faptul ca trebuie sa stim cand sa incrementam numarul de intrebari_sondaj + alte logici realizate aici in parinte.

    async handleIntrebareSalvata(intrebare) {
        //Debug...
        // console.log("HANDLE INTREBARE SALVATA!")
        // console.log(intrebare)

        //Am primit intrebarea care poate fi una din cele 3 tipuri.
        //Incrementam nr de intrebari_sondaj
        //NEAPARAT AWAIT PT CA NU APUCA SA SE INCREMENTEZE!
        //Dracia asta de setState e asincrona!!! (2 ore de chin irosite :( )
        // await this.setState((prevState) => ({nrIntrebari: prevState.nrIntrebari + 1}))

        //Setare ordine
        //UPDATE: Nu mai folosim campul de ordine deoarece este de ajuns sa tinem cont de ordinea din vector
        //Mult mai usor in cazul stergerii si mutarii de elemente
        // intrebare.ordine = this.state.nrIntrebari

        //Adaugam noua intrebare la vectorul parintelui de intrebari create
        //CELE DOUA METODE TREBUIE SCRISE ASA CUM SUNT MAI JOS (SEPARAT).
        // Daca erau scrise pe o singura linie, metoda push ar fi returnat true
        //si in loc de un vector, in state am fi avut un boolean (marfa rau JS-ul)
        this.state.intrebari.push(intrebare)
        await this.setState({intrebari: this.state.intrebari})

        //Debug...
        // console.log("Intrebari dupa: ")
        // console.log(this.state.intrebari)

        //Ascundem sablonul curent din josul paginii (din motive estetice)
        //Pentru a lasa utilizatorul sa selecteze din nou o optiune
        //Este de ajuns sa setam optiunea curenta pe 0
        this.setState({tipIntrebareNoua: 0})
    }

    //Se apasa salvarea sondajului.
    //dupa terminarea salvarii in baza de date avem un then() care ne redirecteaza inapoi la pagina de sondaje
    //datorita faptului ca vectorul de intrebari_sondaj e facut misto (explicat mai sus), trebuie efectiv trantit asa cum in baza de date
    async saveForm() {

        //Presupunem ca nu avem erori de validare deocamdata
        await this.setState({eroareValidare: ""})

        //Verificam daca avem un titlu introdus
        if (!this.state.titlu || this.state.titlu.length < 5) {
            await this.setState({eroareValidare: "Titlul sondajului trebuie sa aiba cel putin 5 caractere!"})
        }

        //Introducerea detaliilor sondajului este optionala... Nu validam nimic

        //Verificare daca exista cel putin o intrebare
        if(this.state.intrebari.length < 1){
            await this.setState({eroareValidare: "Sondajul trebuie sa contina cel putin o intrebare!"})
        }

        if (this.state.eroareValidare.length === 0) {
            DatabaseInstance().saveSondaj(this.state.titlu, this.state.detalii, this.state.intrebari).then(() => {
                alert("Sondaj adaugat!")
                window.location.href = "sondaje"
            })
        }
        else
            alert(this.state.eroareValidare)
    }

    //Functie ajutatoare de render ca sa nu incarcam asa tare functia principala de render
    //Creaza copilul(sablonul) specific tipului de intrebare selectat (care se vrea a fi creat)
    //Sablonul este partea de jos unde specificam optiunile, titlul, etc pentru o intrebare
    renderSablonIntrebareNoua(tip) {
        if (tip === INTREBARE_RASPUNS_DESCHIS) {
            return (
                <div>
                    <SablonCreareRaspunsDeschis onSave={this.handleIntrebareSalvata}/>
                </div>
            )
        } else if (tip === INTREBARE_RASPUNS_MULTIPLU) {
            return (
                <div>
                    <SablonCreareRaspunsMultiplu onSave={this.handleIntrebareSalvata}/>
                </div>
            )
        } else if (tip === INTREBARE_RASPUNS_SIMPLU) {
            return (
                <div>
                    <SablonCreareRaspunsSimplu onSave={this.handleIntrebareSalvata}/>
                </div>
            )
        } else {
            console.log("Nu am putut coverti intrebarea tipul " + tip + " in componenta! Ati selectat ceva?")
            return ''
        }
    }

    async stergeIntrebare(nrIntrebare){
        //Sper ca exista! Ma bazez pe faptul ca nrIntrebare e mereu 'la zi' datorita map-ului din render
        //care asigneaza nrIntrebare corect (sper)
        if (nrIntrebare > -1) {
            let intrebariCurente = this.state.intrebari
            intrebariCurente.splice(nrIntrebare, 1);
            await this.setState({intrebari: intrebariCurente})
        }
    }

    async mutaDeasupra(nrIntrebare){
        //Deasupra => index mai mic

        let intrebariCurente = this.state.intrebari
        let intrebareCareSeMuta = intrebariCurente[nrIntrebare]
        intrebariCurente[nrIntrebare] = intrebariCurente[nrIntrebare-1]
        intrebariCurente[nrIntrebare-1] = intrebareCareSeMuta
        this.setState({intrebari: intrebariCurente})
    }

    async mutaDedesupt(nrIntrebare){
        //Dedesupt => index mai mare

        let intrebariCurente = this.state.intrebari
        let intrebareCareSeMuta = intrebariCurente[nrIntrebare]
        intrebariCurente[nrIntrebare] = intrebariCurente[nrIntrebare+1]
        intrebariCurente[nrIntrebare+1] = intrebareCareSeMuta
        this.setState({intrebari: intrebariCurente})
    }

    //Randeaza vectorul de intrebari create/existente
    renderIntrebariExistente(){

        //Functie ajutatoare care adauga un fel de chenar randarii clasice a intrebarii
        let renderIntrebare = (nrIntrebare, componentaIntrebare) => {
            let indice = nrIntrebare+1;
            return (
                <div className="card element-model rounded-lg w-75 mb-3 ml-auto mr-auto">
                    <div className="d-flex flex-row justify-content-between pl-3 pt-1 pr-1">
                        <p className="text-body"><b>{'Intrebarea #' + indice}</b></p>
                        <div>
                            <IconitaMutaDedesupt nrIntrebare={nrIntrebare}/>
                            <IconitaMutaDeasupra nrIntrebare={nrIntrebare}/>
                            <FontAwesomeIcon className={'m-2'} icon={faTrash} onClick={
                                () => this.stergeIntrebare(nrIntrebare)}/>
                        </div>
                    </div>
                    {/*randeaza componentei din parametru*/}
                    {componentaIntrebare}
                </div>
            )
        }

        //functie ajutatoare (este chiar componenta) care deseneaza sagetica de mutat in jos
        //a unei intrebari doar daca acest lucru este posibil.
        let IconitaMutaDedesupt = (props) => {
            if(props.nrIntrebare < (this.state.intrebari.length-1)){
                return (<FontAwesomeIcon className={'m-2'} icon={faArrowDown} onClick={
                    () => this.mutaDedesupt(props.nrIntrebare)}/>)
            }
            return ''
        }

        //Idem ca cea de sus
        let IconitaMutaDeasupra = (props) => {
            if(props.nrIntrebare > 0){
                return (<FontAwesomeIcon className={'m-2'} icon={faArrowUp} onClick={
                    () => this.mutaDeasupra(props.nrIntrebare)}/>)
            }
            return ''
        }

        //Aici este esenta functiei
        //Randeaza intrebarile create pana in acest moment
        //Folosindu-se si de funtiile ajutatoare de mai sus
        return (
            <div>
                <div className="bg-white p-2 mb-3 mt-3 align-content-center">

                    <hr/>
                    <h5 className="text-body mb-0 p-1"><b>{"Numar total intrebari: " + this.state.intrebari.length}</b></h5>
                    <hr/>
                    {
                        this.state.intrebari.map((intrebare, index) => {
                            if (intrebare.tip === INTREBARE_RASPUNS_DESCHIS) {
                                return (
                                    renderIntrebare(index, <IntrebareRaspunsDeschis key={index} detalii={intrebare.detalii}/>)
                                )
                            } else if (intrebare.tip === INTREBARE_RASPUNS_MULTIPLU) {
                                return (
                                    renderIntrebare(index, <IntrebareRaspunsMultiplu key={index} detalii={intrebare.detalii}/>)
                                )
                            } else if (intrebare.tip === INTREBARE_RASPUNS_SIMPLU) {
                                return (
                                    renderIntrebare(index, <IntrebareRaspunsSimplu key={index} detalii={intrebare.detalii}/>)
                                )
                            } else {
                                console.log("Nu am putut coverti intrebarea " + intrebare + " in componenta!")
                                return (<div key={index}>Componenta invalida!</div>)
                            }
                        })
                    }
                </div>
            </div>
        )
    }

    render() {
        return(
            <div>
                <MeniuInapoi/>
                <div className={"fundal-carduri-model d-flex flex-column"}>
                    <div className={"lista-carduri-model"}>

                        {/*Titlu + descriere*/}
                        <div className="card shadow-lg rounded-lg mt-5" id={'sondaj'} >
                            <div className="input-group m-3 pr-5">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Titlu sondaj</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Default"
                                       aria-describedby="inputGroup-sizing-default" onChange={this.handleNumeSondajChange}/>
                            </div>

                            <div className="input-group m-3 pr-5">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Detalii sondaj</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Default"
                                       aria-describedby="inputGroup-sizing-default" onChange={this.handleDetailsChange}/>
                            </div>
                        </div>

                        {/*Intrebari existente*/}
                        {this.renderIntrebariExistente()}

                        {/*Meniu de selectie a intrebarii care se vrea a fi creata*/}
                        <div className="card shadow-lg rounded-lg mb-2" id={'sondaj'}>
                            <div className="card-body">
                                <h5>Adauga intrebare in sondaj</h5>
                                {/*<FontAwesomeIcon icon={faPlusCircle} />*/}
                                <ul className="list-group lista-adaugare-intrebari">
                                    <li className="list-group-item list-group-item-action"
                                        onClick={this.handleRaspunsSimplu}>Raspuns simplu</li>

                                    <li className="list-group-item list-group-item-action"
                                        onClick={this.handleRaspunsDeschis}>Raspuns deschis</li>

                                    <li className="list-group-item list-group-item-action"
                                        onClick={this.handleRaspunsMultiplu}>Raspuns multiplu</li>
                                </ul>
                                {
                                    // Randare sablon
                                    this.renderSablonIntrebareNoua(this.state.tipIntrebareNoua)
                                }

                            </div>
                        </div>

                        {/*Buton save*/}
                        <div className="card element-model shadow-lg rounded-lg min-vw-80 mb-2 mb-4 mt-4" id={'element-lista-model'}>
                            <h6 onClick={this.saveForm}><b>Salveaza sondajul</b></h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ConstructorDeSondaj;