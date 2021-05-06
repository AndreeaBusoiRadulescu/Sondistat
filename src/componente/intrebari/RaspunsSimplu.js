import React from "react";
import {FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup} from "@material-ui/core";

class RaspunsSimplu extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card rounded-lg min-vw-80 mb-2" id={'element-lista'}>
                <p>{this.props.detalii.titlu}</p>
                <FormControl component="fieldset">
                            <RadioGroup>
                            {
                                this.props.detalii.optiuni.map((optiune, index) => {
                                return (
                                    <label>
                                        <FormControlLabel value={optiune} control={<Radio/>}/>
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

export default RaspunsSimplu;