import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';


class MeniuSondaj extends React.Component{

    constructor(props) {
        super(props);
        this.onClickDetalii = this.onClickDetalii.bind(this);
    }

    onClickDetalii() {
        window.location.href = "detalii/55"
    }

    onClickStergere() {
        var answer = window.confirm("Sigur doriti stergerea?");
        if (answer) {
            //stergere

        }

    }

    render() {
        return(
            <div className="card shadow-lg rounded-lg min-vw-80 mb-2" id={'sondaj'} >
                <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between">
                        <h5 className={'pr-2'}>{this.props.sondaj.title}</h5>
                        <div>
                            <FontAwesomeIcon className={'m-2'} icon={faListAlt} onClick={this.onClickDetalii} />
                            <FontAwesomeIcon className={'m-2'} icon={faTrash} onClick={this.onClickStergere}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default MeniuSondaj;