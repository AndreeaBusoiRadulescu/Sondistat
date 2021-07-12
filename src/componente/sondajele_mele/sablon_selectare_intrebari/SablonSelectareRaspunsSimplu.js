import React from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import {CheckBox} from "@material-ui/icons";

class IntrebareRaspunsSimplu extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card element-model shadow-lg rounded-lg min-vw-80 mb-2" id={'element-lista-model'}>
                <div className={"d-flex justify-content-between"}>
                    {this.props.detalii.titlu}
                    <label style={{display: (this.props.displayCheckBox ? "block" : "none")}}>
                        <Checkbox className="custom-checkbox" onChange={(e) => this.props.onCheckBoxChecked(e, this.props.index)}/>
                    </label>
                </div>
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