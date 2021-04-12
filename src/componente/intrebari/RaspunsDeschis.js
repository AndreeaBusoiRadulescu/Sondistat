import React from "react";

class RaspunsDeschis extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="card shadow-lg rounded-lg min-vw-80 mb-2" id={'sondaj'}>
            <p>{this.props.detalii.titlu}</p>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={this.props.detalii.numarMaxCuvinte/100}/>
        </div>
        )
    }
}

export default RaspunsDeschis;