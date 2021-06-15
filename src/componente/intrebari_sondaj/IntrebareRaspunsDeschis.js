import React from "react";

class IntrebareRaspunsDeschis extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="card element-model rounded-lg shadow-lg min-vw-80 mb-2" id={'element-lista-model'}>
            <p>{this.props.detalii.titlu}</p>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={this.props.detalii.numarMaxCuvinte/100}/>
        </div>
        )
    }
}

export default IntrebareRaspunsDeschis;