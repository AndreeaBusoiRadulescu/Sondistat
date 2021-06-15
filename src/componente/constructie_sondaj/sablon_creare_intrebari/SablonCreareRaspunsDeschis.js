import React from "react";
import {INTREBARE_RASPUNS_DESCHIS} from "../../intrebari_sondaj/EnumTipIntrebari";

class SablonCreareRaspunsDeschis extends React.Component{

    constructor(props) {
        super(props);

        this.handleMaxWords = this.handleMaxWords.bind(this)
        this.handleIntrebare = this.handleIntrebare.bind(this)
        this.handleSave = this.handleSave.bind(this)

        //Raspunsul deschis are o intrebare, numar maxim de cuvinte si eroareDeValidare
        this.state = {
            maxWords: "",
            intrebare: "",
            eroareValidare: ""
        }
    }

    handleMaxWords(e) {
        this.setState({maxWords: parseInt(e.target.value)})
    }

    handleIntrebare(e) {
        this.setState({intrebare: e.target.value})
    }

    //Utilizatorul apasa butonul de save
    //Daca nu exista probleme de validare raspunsul este trimis mai departe
    async handleSave() {

        console.log("HANDLE!")
        await this.setState({eroareValidare: ""})

        if (!this.state.maxWords || isNaN(this.state.maxWords)) {
            await this.setState({eroareValidare: "Numarul de cuvinte trebuie exprimat in cifre!"})
        }

        console.log(!this.state.maxWords)
        console.log(this.state.maxWords)

        if (!this.state.intrebare || this.state.intrebare.length < 5) {
            await this.setState({eroareValidare: "Intrebarea trebuie sa aiba cel putin 5 caractere!"})
        }


        if (this.state.eroareValidare.length === 0) {
            //Este ok
            //Construim intrebarea asa cum trebe
            //Si dam mai departe prin callbackul (functia stabilita de parinte prin care poate fi notificat) din props catre parinte

            this.props.onSave({
                tip: INTREBARE_RASPUNS_DESCHIS,
                detalii: {
                    titlu: this.state.intrebare,
                    numarMaxCuvinte: this.state.maxWords
                }
            })
        }
        else
            //TODO: O metoda mai fashion de afisat validare cum ar fi un snackbar?
            alert(this.state.eroareValidare)
    }

    render(){
        return (
        <div className="card element-model rounded-lg shadow-lg min-vw-80 mb-2" id={'element-lista-model'}>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Intrebarea</span>
                </div>
                <input type="text" className="form-control" aria-label="Default"
                       aria-describedby="inputGroup-sizing-default" onChange={this.handleIntrebare}/>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Numarul maxim de cuvinte</span>
                </div>
                <input type="text" className="form-control" aria-label="Default"
                       aria-describedby="inputGroup-sizing-default" onChange={this.handleMaxWords}/>
            </div>

            <button className="btn btn-primary m-auto" onClick={this.handleSave}>Salveaza</button>
        </div>
        )
    }
}

export default SablonCreareRaspunsDeschis;