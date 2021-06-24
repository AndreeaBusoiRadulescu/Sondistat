import React from "react";

class IntrebareRaspunsDeschis extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            raspuns : null,
            eroareValidare: null
        }

        this.textAreaChanged = this.textAreaChanged.bind(this)
    }

    textAreaChanged(e){
        //S-a schimbat continutul

        //Stergem eroarea de validare (se reafiseaza daca este cazul :D)
        this.setState({
            eroareValidare: null
        })

        //Verificam daca e valid (macar un caracter si daca nu intrece numarul maxim de caractere)
        if(e.target.value.length > this.props.detalii.numarMaxCuvinte){

            //Stergem caracterele extra si readucem textul la maximul posibil
            //Va da efectul unei blocari a scrierii. Cool <3
            e.target.value = e.target.value.substr(0, this.props.detalii.numarMaxCuvinte)
            this.setState({
                raspuns: null,
                eroareValidare: "Numarul maxim de caractere permis este " + this.props.detalii.numarMaxCuvinte
            })
            // alert("Numarul maxim de caractere permis este " + this.props.detalii.numarMaxCuvinte)

            return
        }

        //Nu este un raspuns gol. Nu dam eroare in caz contrat pentru ca poate nu vrea sa raspunda :D.
        if(e.target.value.length >= 1){
            this.setState({
                raspuns: e.target.value
            })
            return
        }

        //Nu a intrat pe nimic, deci e de rau...
        this.setState({
            raspuns: null
        })
    }

    //Citeste comentariile de la raspuns multiplu...
    getRaspuns(){
        if(this.state.raspuns === null && this.state.eroareValidare === null){
            this.setState({
                eroareValidare: "* Intrebarea este obligatorie!"
            })
        }
        return this.state.raspuns //null sau strings
    }

    render() {
        return (
        <div className="card element-model rounded-lg shadow-lg min-vw-80 mb-2" id={'element-lista-model'}>
            <p>{this.props.detalii.titlu}</p>
            <p className="text-danger text-left">{this.state.eroareValidare}</p>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={this.props.detalii.numarMaxCuvinte/100}
                onChange={this.textAreaChanged}/>
        </div>
        )
    }
}

export default IntrebareRaspunsDeschis;