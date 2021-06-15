import React from "react";
import {Checkbox, FormGroup} from "@material-ui/core";

class IntrebareRaspunsMultiplu extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card element-model shadow-lg rounded-lg min-vw-80 mb-2" id={'element-lista-model'} >
                <p>{this.props.detalii.titlu}</p>
                <FormGroup>
                    {
                        this.props.detalii.optiuni.map((optiune, index) => {
                            return (
                                <label key={index}>
                                    <Checkbox className="custom-checkbox"/>
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