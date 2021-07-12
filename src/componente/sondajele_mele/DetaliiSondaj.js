import React from "react";
import MeniuInapoi from "../meniuri_navigare/MeniuInapoi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {renderVectorIntrebariDetalii} from "./AfisareIntrebariPentruDetalii";
import DatabaseInstance from "../../Database";
import 'reactjs-popup/dist/index.css';
import FereastraGrafic from "./FereastraGrafic";


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

        this.exportClicked = this.exportClicked.bind(this);
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
                                    renderVectorIntrebariDetalii(this.state.intrebari)
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
                                <FereastraGrafic/>
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