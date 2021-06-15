import React from "react";
import {FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import {INTREBARE_RASPUNS_SIMPLU} from "../../intrebari_sondaj/EnumTipIntrebari";

class SablonCreareRaspunsSimplu extends React.Component{

    constructor(props) {
        super(props);

        this.handleIntrebare = this.handleIntrebare.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.adaugaVariantaRaspuns = this.adaugaVariantaRaspuns.bind(this)

        //Raspunsul deschis are o intrebare, variante de raspuns si eroareDeValidare
        this.state = {
            intrebare: "",
            eroareValidare: "",
            varianteRaspuns: []
        }
    }

    async adaugaVariantaRaspuns(e) {
        //Luam text-ul variantei de raspuns care se doreste a fi adaugata
        let variantaRaspuns = document.getElementById("varianta-raspuns").value

        //Verificare daca varianta nu e nula
        if(!variantaRaspuns || variantaRaspuns.length < 1){
            await this.setState({eroareValidare: "Varianta de raspuns nu poate fi goala!"})
            alert(this.state.eroareValidare)
            return
        }

        //Verificare daca varianta exista deja
        if(this.state.varianteRaspuns.includes(variantaRaspuns)){
            await this.setState({eroareValidare: "Varianta de raspuns exista deja!"})
            alert(this.state.eroareValidare)
            return
        }

        //Adaugare varianta de raspuns la vectorul de variante de raspuns
        let vectorCurent = this.state.varianteRaspuns
        vectorCurent.push(variantaRaspuns)
        this.setState({varianteRaspuns: vectorCurent})
    }

    handleIntrebare(e) {
        this.setState({intrebare: e.target.value})
    }

    //Utilizatorul apasa butonul de save
    //Daca nu exista probleme de validare raspunsul este trimis mai departe
    async handleSave() {

        console.log("HANDLE!")
        await this.setState({eroareValidare: ""})

        if (!this.state.intrebare || this.state.intrebare.length < 5) {
            await this.setState({eroareValidare: "Intrebarea trebuie sa aiba cel putin 5 caractere!"})
        }

        //Verificare daca exista cel putin 2 variante de raspuns
        if (this.state.varianteRaspuns.length < 2){
            await this.setState({eroareValidare: "Trebuie cel putin 2 variante de raspuns!"})
        }

        if (this.state.eroareValidare.length === 0) {
            //Este ok
            //Construim intrebarea asa cum trebe
            //Si dam mai departe prin callbackul (functia stabilita de parinte prin care poate fi notificat) din props catre parinte

            this.props.onSave({
                tip: this.getTipIntrebare(),
                detalii: {
                    titlu: this.state.intrebare,
                    optiuni: this.state.varianteRaspuns
                }
            })
        }
        else
            //TODO: O metoda mai fashion de afisat validare cum ar fi un snackbar?
            alert(this.state.eroareValidare)
    }

    //Folosita pentru ca vreau ca SablonIntrebareRaspunsMultiplu sa mosteneasca clasa
    //Si asa va putea face override si sa specifice tipul sau.
    getTipIntrebare(){
        return INTREBARE_RASPUNS_SIMPLU
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
                        <span className="input-group-text" id="inputGroup-sizing-default">Varianta de raspuns</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Default" id="varianta-raspuns"
                           aria-describedby="inputGroup-sizing-default" />
                    <div className="input-group-append">
                            <button className="btn btn-secondary" onClick={this.adaugaVariantaRaspuns}>Adauga</button>
                    </div>
                </div>

                <FormControl component="fieldset">
                    <RadioGroup className="align-content-start">
                        {
                            this.state.varianteRaspuns.map((optiune, index) => {
                                return (
                                    <label key={index} className="align-self-start">
                                        <FormControlLabel value={optiune} control={<Radio/>}/>
                                        <span>{optiune}</span>
                                    </label>
                                )})
                        }
                    </RadioGroup>
                </FormControl>

                <button className="btn btn-primary m-auto" onClick={this.handleSave}>Salveaza</button>
            </div>
        )
    }
}

export default SablonCreareRaspunsSimplu;