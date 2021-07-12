import React from "react";
import MeniuInapoi from "../meniuri_navigare/MeniuInapoi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import DatabaseInstance from "../../Database";
import {Statistics} from 'statistics.js'
import 'reactjs-popup/dist/index.css';
import FereastraGrafic from "./FereastraGrafic";
import {
    INTREBARE_RASPUNS_DESCHIS,
    INTREBARE_RASPUNS_MULTIPLU,
    INTREBARE_RASPUNS_SIMPLU
} from "../intrebari_sondaj/EnumTipIntrebari";
import SablonSelectareRaspunsDeschis from "./sablon_selectare_intrebari/SablonSelectareRaspunsDeschis";
import SablonSelectareRaspunsMultiplu from "./sablon_selectare_intrebari/SablonSelectareRaspunsMultiplu";
import SablonSelectareRaspunsSimplu from "./sablon_selectare_intrebari/SablonSelectareRaspunsSimplu";
import {parse} from "@fortawesome/fontawesome-svg-core";


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
            link: "http://model/123",
            intrebariSelectate: []
        }

        this.exportClicked = this.exportClicked.bind(this);
        this.onChildCheckBoxChecked = this.onChildCheckBoxChecked.bind(this)
        // const domContainer = document.querySelector('#app');
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
            link: window.location.origin + "/completare/" + sondaj.id,
            //By default nu este nicio intrebare selectata pt grafic (toate sunt cu false)
            intrebariSelectate: Array(sondaj.questions.length).fill(false)
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
        // alert(JSON.stringify(this.raspunsuri, null, 2))
        let jsonFileData = JSON.stringify(this.raspunsuri, null, 2);

        // //define the heading for each row of the data
        // var csv = 'Name,Profession\n';
        //
        // //merge the data with CSV
        // csvFileData.forEach(function(row) {
        //     csv += row.join(',');
        //     csv += "\n";
        // });

        //display the created CSV data on the web browser
        // document.write(jsonFileData);


        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/json;charset=utf-8,' + encodeURI(jsonFileData);
        hiddenElement.target = '_blank';

        hiddenElement.download = 'raspunsuri.json';
        hiddenElement.click();
    }

    conversieLaVector(data){
        if(typeof data === "string"){
            //Stim sigur ca e un numar sub forma de string => conversie la un vector de un sigur element de tip numar
            return [parseFloat(data)]
        }

        if(typeof data === "object"){
            //Stim sigur ca e un obiect de tip Array => conversie la un vector de numere
            return data.map(elem => parseFloat(elem))
        }
    }

    getSetDateIntrebariSelectate(){
        let setDate = []
        let indexIntrebariSelectate = []

        for(let index = 0; index < this.state.intrebariSelectate.length; index++){
            if(this.state.intrebariSelectate[index] === true){
                indexIntrebariSelectate.push(index)
            }
        }

        //Stim indecsii celor doua intrebari selectate pentru analiza grafica
        //Acum vom trece prin toate raspunsurile primite si vom face perechi intre variantele de raspuns ale celor 2 intrebari
        //Exemplu: "intrebare 1": "5"; "intrebare 2" : "7, 8"
        //Perechile rezultate vor fi (produs cartezian): [5, 7], [5, 8]

        this.raspunsuri.forEach(raspuns => {
            let X = raspuns[indexIntrebariSelectate[0]]
            let Y = raspuns[indexIntrebariSelectate[1]]

            X = this.conversieLaVector(X)
            Y = this.conversieLaVector(Y)

            console.log("X SI Y")
            console.log(X)
            console.log(Y)

            //Fac pereche pentru fiecare x din X cu un y din Y
            X.forEach(x => {
                Y.forEach(y => {
                    setDate.push([x, y])
                })
            })
        })

        let tabHeader = [this.state.intrebari[indexIntrebariSelectate[0]].detalii.titlu, this.state.intrebari[indexIntrebariSelectate[1]].detalii.titlu]
        setDate = [tabHeader].concat(setDate)
        // console.log(setDate)

        let X = setDate.map(date => date[0]).filter(date => !isNaN(date))
        let Y = setDate.map(date => date[1]).filter(date => !isNaN(date))
        console.log(X)
        console.log(Y)
        let limite = {
            minX: Math.min(...X) - 2,
            maxX: Math.max(...X) + 2,
            minY: Math.min(...Y) - 2,
            maxY: Math.max(...Y) + 2
        }

        console.log("LIMITE")
        console.log(limite)

        //Prelucram setul de date pentru a face regresie liniara
        let statsData = []
        setDate.slice(1).forEach(data => {
            statsData.push({x: data[0], y: data[1]})
        })

        let metrics = {
            x: 'metric',
            y: 'metric'
        }

        console.log(statsData)

        let stats = new Statistics(statsData, metrics)
        let regression = stats.linearRegression('x', 'y')
        console.log(regression)

        return [setDate, limite, regression]
    }

    getNumarIntrebariSelectate(){
        return this.state.intrebariSelectate.filter(selectie => (selectie === true)).length
    }

    async onChildCheckBoxChecked(e, childIndex) {

        if(e.target.checked){
            //Verificam daca sunt cel mult doua intrebari selectate
            let nrIntrebariSelectate = this.getNumarIntrebariSelectate()
            if(nrIntrebariSelectate >= 2) {
                e.target.click()
                alert("Nu se pot selecta mai mult de 2 intrebari pentru realizarea graficului!!!")
                return;
            }
        }

        let vectorVechi = this.state.intrebariSelectate
        vectorVechi[childIndex] = e.target.checked //actualizam selectia cu false sau true daca e bifat sau debifat

        await this.setState({intrebariSelectate: vectorVechi}) //actualizam in state vectorul de selectii
        console.log(this.state.intrebariSelectate)
    }

    esteBunaPentruAnaliza(indexIntrebare){
        //O intrebare poate face parte din analiza doar daca are toate raspunsurile posibile de tipul number.
        //Verificam deci daca intrebarea are doar raspunsuri de tip number.
        let intrebare = this.state.intrebari[indexIntrebare]

        //Daca intrebarea nu are optiuni (e de tip raspuns deschis) => nu poate fi bagata la analiza
        if(intrebare.detalii.optiuni === undefined) return false

        let nrRaspunsuriDeTipNumar = intrebare.detalii.optiuni.filter(optiune => (!isNaN(optiune))).length

        //Daca numarul raspunsurilor de tip numar === numer raspunsuri totale => toate raspunsurile sunt de tip Numar
        return nrRaspunsuriDeTipNumar === intrebare.detalii.optiuni.length;
    }



    render() {

        let graficData = undefined
        if(this.getNumarIntrebariSelectate() === 2)
            graficData = this.getSetDateIntrebariSelectate()

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
                                <div className="col-md-5 card shadow-lg rounded-lg mb-2 mr-3" id={'sondaj'} >
                                    <div className="d-flex justify-content-between">
                                        <h6 className="numeSondaj m-3">Link:</h6>
                                        <a className={"mt-3"} href={this.state.link}>{this.state.link}</a>
                                        <FontAwesomeIcon className={"mt-3 mr-3"} icon={faCopy}/>
                                    </div>
                                </div>
                            </div>



                        <div className={"row mr-3"}>
                            <div className={"col intrebari-detalii d-flex flex-column justify-content-start mr-3"} id={"scrolabil-detalii"}>
                                {
                                    this.state.intrebari.map((intrebare, index) => {
                                        // returneaza elementul si paseaza cheia

                                        let componentaCreata

                                        if (intrebare.tip === INTREBARE_RASPUNS_DESCHIS) {
                                            componentaCreata = (
                                                <div>
                                                    <SablonSelectareRaspunsDeschis key={index} index={index} detalii={intrebare.detalii}
                                                        onCheckBoxChecked={this.onChildCheckBoxChecked} displayCheckBox={this.esteBunaPentruAnaliza(index)}/>
                                                </div>
                                            )
                                        } else if (intrebare.tip === INTREBARE_RASPUNS_MULTIPLU) {
                                            componentaCreata = (
                                                <div>
                                                    <SablonSelectareRaspunsMultiplu key={index} index={index} detalii={intrebare.detalii}
                                                        onCheckBoxChecked={this.onChildCheckBoxChecked} displayCheckBox={this.esteBunaPentruAnaliza(index)}/>
                                                </div>
                                            )
                                        } else if (intrebare.tip === INTREBARE_RASPUNS_SIMPLU) {
                                            componentaCreata = (
                                                <div>
                                                    <SablonSelectareRaspunsSimplu key={index} index={index} detalii={intrebare.detalii}
                                                        onCheckBoxChecked={this.onChildCheckBoxChecked} displayCheckBox={this.esteBunaPentruAnaliza(index)}/>
                                                </div>
                                            )
                                        } else {
                                            console.log("Nu am putut coverti intrebarea " + intrebare + " in componenta!")
                                            componentaCreata = (
                                                <div key={index}>Componenta invalida!</div>
                                            )
                                        }
                                        return componentaCreata
                                    })
                                }
                            </div>
                            <div className="col grafice card shadow-lg rounded-lg min-vw-80">
                                <br/>
                                <h5>Meniu generare grafic</h5>
                                <br/>
                                {/*<RadioGroup>*/}
                                {/*    {*/}
                                {/*        <label>*/}
                                {/*            <FormControlLabel control={<Radio/>}/>*/}
                                {/*            <span>Grafic de frecventa</span>*/}
                                {/*            <br/>*/}
                                {/*            <FormControlLabel control={<Radio/>}/>*/}
                                {/*            <span>Grafic de regresie</span>*/}
                                {/*        </label>*/}
                                {/*    }*/}
                                {/*</RadioGroup>*/}
                                <p>Va rugam sa selectati intrebarile pentru care doriti o analiza grafica.</p>
                                <br/>
                                <div>
                                    {
                                        (this.getNumarIntrebariSelectate() === 2) && (<FereastraGrafic setDate={graficData[0]} limite={graficData[1]}
                                            regresie={graficData[2]}/>)
                                    }
                                </div>

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