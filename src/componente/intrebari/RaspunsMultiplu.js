import React from "react";
import {Checkbox, FormGroup} from "@material-ui/core";

class RaspunsMultiplu extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card rounded-lg min-vw-80 mb-2" id={'element-lista'} >
                <p>{this.props.detalii.titlu}</p>
                <FormGroup>
                    {
                        this.props.detalii.optiuni.map((optiune, index) => {
                            return (
                                <label>
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

export default RaspunsMultiplu;