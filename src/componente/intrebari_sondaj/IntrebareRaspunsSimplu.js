import React from "react";
import {FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup} from "@material-ui/core";

class IntrebareRaspunsSimplu extends React.Component{

    constructor(props) {
        super(props);
        this.radioChecked = this.radioChecked.bind(this)

        this.state = {
            raspuns : null,
            eroareValidare: null
        }
    }

    radioChecked(e, index){
        //S-a bifat/debifat raspunsul de pe pozitia index
        //Cum exista un singur raspuns, atunci cand se bifeaza raspunsul X, 100% nu mai exista si alt raspuns bifat
        //Deci e de ajuns sa stim ca raspunsul s-a bifat si sa-l actualizam in state
        if(e.target.checked){
            this.setState({
                raspuns: this.props.detalii.optiuni[index],
                eroareValidare: null
            })
        }

        //UPDATE: Nu se poate debifa un raspuns deja selectat.
        //Nu are rost ce e mai jos
        /*
            //Exista insa si posibilitatea debifarii optiunii care era deja bifata, fiind astfel debifat raspunsul deja dat
            //Deoarece debifarea este posibila doar pentru debifarea chiar a raspunsului deja dat
            //Putem stii cu siguranta ca daca o debifare are loc, inseamna ca nu avem niciun raspuns selectat!
            //Asta pentru ca avem un singur raspuns posibil!
            if(e.target.checked === false){
                //Stergem raspunsul
                this.setState({
                    raspuns: null
                })
            }
        */
    }

    //Citeste comentariile de la raspuns Multiplu...
    getRaspuns(){

        if(this.state.raspuns === null){
            //Eroare de validare
            this.setState({
                eroareValidare: "* Intrebarea este obligatorie!"
            })
        }

        return this.state.raspuns //null sau string
    }

    render() {
        return (
            <div className="card element-model shadow-lg rounded-lg min-vw-80 mb-2" id={'element-lista-model'}>
                <p>{this.props.detalii.titlu}</p>
                <p className="text-danger text-left">{this.state.eroareValidare}</p>
                <FormControl component="fieldset">
                            <RadioGroup>
                            {
                                this.props.detalii.optiuni.map((optiune, index) => {
                                return (
                                    <label key={index}>
                                        <FormControlLabel value={optiune} control={<Radio/>}
                                                          onChange={(e) => this.radioChecked(e, index)}/>
                                        <span>{optiune}</span>
                                    </label>
                                )})
                            }
                            </RadioGroup>
                </FormControl>
            </div>
        )
    }
}

export default IntrebareRaspunsSimplu;