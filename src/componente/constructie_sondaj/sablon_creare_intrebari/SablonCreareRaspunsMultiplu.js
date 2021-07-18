import React from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup} from "@material-ui/core";
import {INTREBARE_RASPUNS_MULTIPLU, INTREBARE_RASPUNS_SIMPLU} from "../../intrebari_sondaj/EnumTipIntrebari";
import SablonCreareRaspunsSimplu from "./SablonCreareRaspunsSimplu";
import {CheckBox} from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {Alert} from "@material-ui/lab";

class SablonCreareRaspunsMultiplu extends SablonCreareRaspunsSimplu{

    //La fel ca la raspunsul simplu
    //Incercam cu mostenire. Deocamdata merge bine :))

    getTipIntrebare(): number {
        return INTREBARE_RASPUNS_MULTIPLU
    }

    render(): * {
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
                                        <FormControlLabel value={optiune} control={<Checkbox/>}/>
                                        <span>{optiune}</span>
                                    </label>
                                )})
                        }
                    </RadioGroup>
                </FormControl>

                <button className="btn btn-primary m-auto" onClick={this.handleSave}>Salveaza</button>

                {
                    this.state.eroareValidare.length > 1 &&
                    <Snackbar open={this.state.snackbar} onClose={this.handleClose} autoHideDuration={3000} >
                        <Alert  severity="error">
                            {this.state.eroareValidare}
                        </Alert>
                    </Snackbar>
                }
            </div>
        )
    }
}

export default SablonCreareRaspunsMultiplu;