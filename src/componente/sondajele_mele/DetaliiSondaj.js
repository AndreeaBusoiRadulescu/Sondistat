import React from "react";
import MeniuInapoi from "../meniuri_navigare/MeniuInapoi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import DatabaseInstance from "../../Database";
import {Statistics} from 'statistics.js'
import 'reactjs-popup/dist/index.css';
import FereastraRegresie from "./FereastraRegresie";
import {
    INTREBARE_RASPUNS_DESCHIS,
    INTREBARE_RASPUNS_MULTIPLU,
    INTREBARE_RASPUNS_SIMPLU
} from "../intrebari_sondaj/EnumTipIntrebari";
import SablonSelectareRaspunsDeschis from "./sablon_selectare_intrebari/SablonSelectareRaspunsDeschis";
import SablonSelectareRaspunsMultiplu from "./sablon_selectare_intrebari/SablonSelectareRaspunsMultiplu";
import SablonSelectareRaspunsSimplu from "./sablon_selectare_intrebari/SablonSelectareRaspunsSimplu";
import FereastraFrecventa from "./FereastraFrecventa";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {Alert} from "@material-ui/lab";


class DetaliiSondaj extends React.Component{

    constructor() {
        super();

        //Intrebarile vor avea
        // 1. ordine de afisare
        // 2. tip: 1 -> Raspuns deschis   2 -> Raspuns simplu   3-> Raspuns multiplu
        // 3. detalii de implementare pt fiecare tip in parte (difera de la una la alta)

        this.state = {
            intrebari: [],
            titlu: "Titlu",
            detalii: "Detalii",
            nrRaspunsuri: null,
            link: "http://model/123",
            snackBarInfo:"",
            intrebariSelectate: [],
            snackbar: true
        }

        this.exportClicked = this.exportClicked.bind(this);
        this.onChildCheckBoxChecked = this.onChildCheckBoxChecked.bind(this);
        this.copyClicked = this.copyClicked.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
        this.completari = await DatabaseInstance().getCompletariSondaj(this.idSondaj)

        this.raspunsuri = []
        this.completari.forEach((completare) => {
            this.raspunsuri.push(completare.raspunsuri)
        })

        //Actualizam numarul raspunsurilor/completarilor
        this.setState({
            nrRaspunsuri: this.raspunsuri.length
        })
    }


    exportClicked(e){
        //CSV FILE
        let csvFileData = this.raspunsuri;
        let csv = "";

        // for (let intrebare in csvFileData[0]){
        //     csv += intrebare + ";";
        // }

        for (let intrebare of this.state.intrebari){
            csv += intrebare.detalii.titlu + ';';
        }
        csv += "\n";

        csvFileData.forEach(raspunsSondaj => {

            for (let intrebare in raspunsSondaj){
                csv += raspunsSondaj[intrebare] + ";";
            }
            csv += "\n";

        });

        var hiddenElementCSV = document.createElement('a');
        hiddenElementCSV.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElementCSV.target = '_blank';

        hiddenElementCSV.download = 'raspunsuri.csv';
        hiddenElementCSV.click();


        //JSON FILE
        let jsonFileData = JSON.stringify(this.raspunsuri, null, 2);

        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/json;charset=utf-8,' + encodeURI(jsonFileData);
        hiddenElement.target = '_blank';

        hiddenElement.download = 'raspunsuri.json';
        hiddenElement.click();
    }

    copyClicked(){
        const text = this.state.link;
        const mainThis = this;
        navigator.clipboard.writeText(text).then(function() {
            mainThis.setState({snackBarInfo: "Textul a fost copiat!", snackbar: true})
        }, function(err) {
            mainThis.setState({snackBarInfo: "Nu s-a putut copia textul! A intervenit o eroare", snackbar: true})
        });
    }

    conversieLaVectorFloat(data){
        if(typeof data === "string"){
            //Stim sigur ca e un numar sub forma de string => conversie la un vector de un sigur element de tip numar
            return [parseFloat(data)]
        }

        if(typeof data === "object"){
            //Stim sigur ca e un obiect de tip Array => conversie la un vector de numere
            return data.map(elem => parseFloat(elem))
        }
    }

    conversieLaVector(data){
        if(typeof data === "string"){
            //Stim sigur ca e un numar sub forma de string => conversie la un vector de un sigur element de tip numar
            return [data]
        }

        if(typeof data === "object"){
            //Stim sigur ca e un obiect de tip Array => conversie la un vector de numere
            return data
        }
    }

    getSetDateIntrebareSelectata() {
        // functia este chemata doar cand este o singura selectie
        let intrebareSelectata = this.getIndexIntrebariSelectate()[0]

        let mapFrecvente = new Map()

        //map cu frecvente 0 pentru fiecare varianta de raspuns posibila
        let posibileRaspunsuri = this.conversieLaVector(this.state.intrebari[intrebareSelectata].detalii.optiuni)
        posibileRaspunsuri.forEach(posibilaVarianta => {
            mapFrecvente.set(posibilaVarianta, 0)
        })

        console.log(posibileRaspunsuri)

        //Actualizam numarul de frecvente al raspunsurilor
        this.raspunsuri.forEach(raspunsSondaj => {
            let raspunsuriIntrebare = this.conversieLaVector(raspunsSondaj[intrebareSelectata])

            raspunsuriIntrebare.forEach(variantaAleasa => {
                mapFrecvente.set(variantaAleasa, mapFrecvente.get(variantaAleasa)+1)
            })
        })

        console.log(mapFrecvente)

        let vectorAparitii = []
        //Convertim map-ul de frecvente la perechi de genul [variantaRaspuns, nrFrecvente]
        for (let [key, value] of mapFrecvente) {
            vectorAparitii.push([key, value])
        }
        let ret = [['Raspuns', 'Frecventa raspuns']].concat(vectorAparitii)
        return ret
    }

    getSetDateIntrebariSelectate(){
        let setDate = []

        let indexIntrebariSelectate = this.getIndexIntrebariSelectate()

        //Stim indecsii celor doua intrebari selectate pentru analiza grafica
        //Acum vom trece prin toate raspunsurile primite si vom face perechi intre variantele de raspuns ale celor 2 intrebari
        //Exemplu: "intrebare 1": "5"; "intrebare 2" : "7, 8"
        //Perechile rezultate vor fi (produs cartezian): [5, 7], [5, 8]

        this.raspunsuri.forEach(raspuns => {
            let X = raspuns[indexIntrebariSelectate[0]]
            let Y = raspuns[indexIntrebariSelectate[1]]

            X = this.conversieLaVectorFloat(X)
            Y = this.conversieLaVectorFloat(Y)


            //Fac pereche pentru fiecare x din X cu un y din Y
            X.forEach(x => {
                Y.forEach(y => {
                    setDate.push([x, y])
                })
            })
        })

        let tabHeader = [this.state.intrebari[indexIntrebariSelectate[0]].detalii.titlu, this.state.intrebari[indexIntrebariSelectate[1]].detalii.titlu]
        setDate = [tabHeader].concat(setDate)

        let X = setDate.map(date => date[0]).filter(date => !isNaN(date))
        let Y = setDate.map(date => date[1]).filter(date => !isNaN(date))

        let limite = {
            minX: Math.min(...X) - 2,
            maxX: Math.max(...X) + 2,
            minY: Math.min(...Y) - 2,
            maxY: Math.max(...Y) + 2
        }

        //Prelucram setul de date pentru a face regresie liniara
        let statsData = []
        setDate.slice(1).forEach(data => {
            statsData.push({x: data[0], y: data[1]})
        })

        let metrics = {
            x: 'metric',
            y: 'metric'
        }

        let stats = new Statistics(statsData, metrics)
        let regression = stats.linearRegression('x', 'y')
        console.log(regression)

        return [setDate, limite, regression]
    }

    getNumarIntrebariSelectate(){
        return this.state.intrebariSelectate.filter(selectie => (selectie === true)).length
    }

    getIndexIntrebariSelectate(){
        let indexIntrebariSelectate = []

        for(let index = 0; index < this.state.intrebariSelectate.length; index++){
            if(this.state.intrebariSelectate[index] === true){
                indexIntrebariSelectate.push(index)
            }
        }

        return indexIntrebariSelectate
    }

    async onChildCheckBoxChecked(e, childIndex) {

        if(e.target.checked){
            //Verificam daca sunt cel mult doua intrebari selectate
            let nrIntrebariSelectate = this.getNumarIntrebariSelectate()
            if(nrIntrebariSelectate >= 2) {
                e.target.click()
                alert("Nu se pot selecta mai mult de 2 intrebari!")
                return;
            }
        }

        let vectorVechi = this.state.intrebariSelectate
        vectorVechi[childIndex] = e.target.checked //actualizam selectia cu false sau true daca e bifat sau debifat

        await this.setState({intrebariSelectate: vectorVechi}) //actualizam in state vectorul de selectii
        console.log(this.state.intrebariSelectate)
    }

    esteBunaPentruRegresie(indexIntrebare){
        //O intrebare poate face parte din analiza doar daca are toate raspunsurile posibile de tipul number.
        //Verificam deci daca intrebarea are doar raspunsuri de tip number.
        let intrebare = this.state.intrebari[indexIntrebare]

        //Daca intrebarea nu are optiuni (e de tip raspuns deschis) => nu poate fi bagata la analiza
        if(intrebare.detalii.optiuni === undefined) return false

        let nrRaspunsuriDeTipNumar = intrebare.detalii.optiuni.filter(optiune => (!isNaN(optiune))).length

        //Daca numarul raspunsurilor de tip numar === numer raspunsuri totale => toate raspunsurile sunt de tip Numar
        return nrRaspunsuriDeTipNumar === intrebare.detalii.optiuni.length;
    }

    esteBunaPentruAnaliza(indexIntrebare){
        return this.state.intrebari[indexIntrebare].tip !== INTREBARE_RASPUNS_DESCHIS
    }

    trebuieCheckBox(indexIntrebare){

        console.log(this.raspunsuri)

        if(this.raspunsuri === undefined || this.raspunsuri.length === 0)
            return false

        let indexIntrebariSelectate = this.getIndexIntrebariSelectate()

        //Lasam cu checkbox doar intrebarile deja selectate pentru a putea fi deselectate
        if(indexIntrebare === indexIntrebariSelectate[0] || indexIntrebare === indexIntrebariSelectate[1])
            return true

        if(this.getNumarIntrebariSelectate() === 0)
            return this.esteBunaPentruAnaliza(indexIntrebare)

        if(this.getNumarIntrebariSelectate() === 1){
            // //Verificam intai daca intrebarea selectata este potrivita pentru regresie
            // //Stim sigur ca avem doar una. O verificam daca este ok pentru regresie
            // if(!this.esteBunaPentruRegresie(indexIntrebariSelectate[0]))
            //     return false

            //In punctul acesta stim ca prima intrebare este ok pentru regresie. Verificam daca si
            // cea nou selectata este ok (a doua)
            return (this.esteBunaPentruRegresie(indexIntrebare) && this.esteBunaPentruRegresie(indexIntrebariSelectate[0]))
        }

        return false
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({snackbar: false})
        // event.setOpen(false);
    };

    render() {

        let regresionData = undefined
        let statsData = undefined
        if(this.getNumarIntrebariSelectate() === 2)
            regresionData = this.getSetDateIntrebariSelectate()

        if(this.getNumarIntrebariSelectate() === 1)
            statsData = this.getSetDateIntrebareSelectata()

        return(
            <div className={"img-container"} id={"imagineSondaje"}>
                <MeniuInapoi/>
                <div className={"d-flex flex-column"}>
                    <div className={"lista-carduri-detalii"}>
                        <div className="card shadow-lg rounded-lg min-vw-80 mb-2" id={'sondaj'} >
                            <h1>{this.state.titlu}</h1>
                            <p>{this.state.detalii}</p>
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
                                        <a target="_blank" rel="noopener noreferrer" className={"mt-3"} id="link-text" style={{overflowWrap: "anywhere"}} href={this.state.link}>{this.state.link}</a>
                                        <FontAwesomeIcon className={"mt-3 mr-3"} icon={faCopy}  onClick={this.copyClicked}/>
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
                                                        onCheckBoxChecked={this.onChildCheckBoxChecked} displayCheckBox={this.trebuieCheckBox(index)}/>
                                                </div>
                                            )
                                        } else if (intrebare.tip === INTREBARE_RASPUNS_MULTIPLU) {
                                            componentaCreata = (
                                                <div>
                                                    <SablonSelectareRaspunsMultiplu key={index} index={index} detalii={intrebare.detalii}
                                                        onCheckBoxChecked={this.onChildCheckBoxChecked} displayCheckBox={this.trebuieCheckBox(index)}/>
                                                </div>
                                            )
                                        } else if (intrebare.tip === INTREBARE_RASPUNS_SIMPLU) {
                                            componentaCreata = (
                                                <div>
                                                    <SablonSelectareRaspunsSimplu key={index} index={index} detalii={intrebare.detalii}
                                                        onCheckBoxChecked={this.onChildCheckBoxChecked} displayCheckBox={this.trebuieCheckBox(index)}/>
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
                                <div>
                                    {
                                        (this.getNumarIntrebariSelectate() === 0) && (<p>Va rugam sa selectati intrebarile pentru care doriti o analiza grafica.</p>)
                                    }
                                </div>
                                <br/>

                                <div>
                                    {
                                        (this.getNumarIntrebariSelectate() === 2) && (<FereastraRegresie setDate={regresionData[0]} limite={regresionData[1]}
                                                                                                         regresie={regresionData[2]}/>)
                                    }
                                </div>

                                <div>
                                    {
                                        (this.getNumarIntrebariSelectate() === 1) && (<FereastraFrecventa setDate={statsData}/>)
                                    }
                                </div>

                                <br/>
                            </div>
                        </div>
                        {
                            this.state.snackBarInfo.length > 1 &&
                            <Snackbar open={this.state.snackbar} onClose={this.handleClose} autoHideDuration={3000} >
                                <Alert severity="info">
                                    {this.state.snackBarInfo}
                                </Alert>
                            </Snackbar>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default DetaliiSondaj;