import React from "react";

class RaspunsDeschis extends React.Component{

    constructor(props) {
        super(props);


    }

    render() {
        return (
        <div>
            <p>{this.props.detalii.titlu}</p>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={this.props.detalii.numarMaxCuvinte/100}/>
        </div>
        )
    }
}

export default RaspunsDeschis;