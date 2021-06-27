import React from "react";
import {Checkbox, FormGroup} from "@material-ui/core";

class IntrebareRaspunsMultiplu extends React.Component{

    constructor(props) {
        super(props);
        this.checkBoxChanged = this.checkBoxChanged.bind(this)

        this.state = {
            //Vector care tine cont de bifele utilizatorului
            //Initial niciun raspuns nu e bifat
            //Facem deci un vector cu N valori de false (N = nr de raspunsuri pe care le are intrebarea)
            raspunsuriBifate: Array(this.props.detalii.optiuni.length).fill(false)
        }
    }

    checkBoxChanged(e, index){
        //Raspunsul pe pozitia index a fost bifat sau debifat
        //Tinem deja minte intr-un vector care raspunsuri au fost bifate/debifate
        //Acum doar actualizam valorile
        let vectorVechi = this.state.raspunsuriBifate
        vectorVechi[index] = e.target.checked //este false sau true

        this.setState({
            raspunsuriBifate: vectorVechi,
            eroareValidare: null
        })
    }

    //Metoda care va fi apelata din exterior in momentul completarii unui sondaj
    //Este apelata pentru ca se vrea obtinerea raspunsurilor alese de utilizator
    //Pentru ca stim ca este chemata doar atunci cand vrem sa salvam raspunsurile
    //se pot afisa niste mesaje de eroare de genul "Intrebarea este obligatorie!"
    getRaspuns(){
        //Stim deja ce intrebari sunt sau nu bifate (this.state.raspunsuriBifate)
        let raspunsuriUtilizator = []
        for(let i = 0; i < this.state.raspunsuriBifate.length; i++){
            if(this.state.raspunsuriBifate[i] === true){
                //Intrebarii de pe pozitia X ii corespunde optiunea X primita prin props
                let raspunsConcret = this.props.detalii.optiuni[i]
                raspunsuriUtilizator.push(raspunsConcret)
            }
        }

        //Nu avem raspunsuri bifate, returnam prin conventie null
        if(raspunsuriUtilizator.length === 0){
            //Afisam si o eroare pentru treaba asta
            this.setState({
                eroareValidare: "* Intrebarea este obligatorie!"
            })
            return null
        }

        return raspunsuriUtilizator
    }

    render() {
        return (
            <div className="card element-model shadow-lg rounded-lg min-vw-80 mb-2" id={'element-lista-model'} >
                <div className={"d-flex justify-content-between"}>
                    {this.props.detalii.titlu}
                    <label>
                        <Checkbox className="custom-checkbox"/>
                    </label>
                </div>
                <p className="text-danger text-left">{this.state.eroareValidare}</p>
                <FormGroup>
                    {
                        this.props.detalii.optiuni.map((optiune, index) => {
                            return (
                                <label key={index}>
                                    <Checkbox className="custom-checkbox" onChange={(e) => this.checkBoxChanged(e, index)} />
                                    <span>{optiune}</span>
                                </label>
                            )
                        })
                    }
                </FormGroup>
            </div>
        )
    }
}

export default IntrebareRaspunsMultiplu;