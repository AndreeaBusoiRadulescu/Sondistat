import React from "react";
import {Checkbox, FormGroup} from "@material-ui/core";

class RaspunsMultiplu extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card shadow-lg rounded-lg min-vw-80 mb-2" id={'sondaj'}>
                <p>{this.props.detalii.titlu}</p>
                <FormGroup>
                    {
                        this.props.detalii.optiuni.map((optiune, index) => {
                            return (
                                <label>
                                    <Checkbox/>
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