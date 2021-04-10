import React from "react";

class RaspunsSimplu extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>{this.props.detalii.titlu}</p>
                Raspuns simplu
            </div>
        )
    }
}

export default RaspunsSimplu;