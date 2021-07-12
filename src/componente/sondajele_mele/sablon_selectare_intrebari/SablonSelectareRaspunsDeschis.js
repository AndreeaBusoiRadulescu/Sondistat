import React from "react";
import {Checkbox} from "@material-ui/core";

class IntrebareRaspunsDeschis extends React.Component{

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div className="card element-model rounded-lg shadow-lg min-vw-80 mb-2" id={'element-lista-model'}>
                <div className={"d-flex justify-content-between"}>
                    {this.props.detalii.titlu}
                    <label style={{display: (this.props.displayCheckBox ? "block" : "none")}}>
                        <Checkbox className="custom-checkbox" onChange={(e) => this.props.onCheckBoxChecked(e, this.props.index)}/>
                    </label>
                </div>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows={this.props.detalii.numarMaxCuvinte/100}/>
            </div>
        )
    }
}

export default IntrebareRaspunsDeschis;