import React from "react";

class RaspunsMultiplu extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>{this.props.detalii.titlu}</p>
                Raspuns multiplu
            </div>
        )
    }
}

export default RaspunsMultiplu;