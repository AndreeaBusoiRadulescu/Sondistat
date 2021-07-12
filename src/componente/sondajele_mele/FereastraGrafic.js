import React from "react";
import Modal from "react-modal";
import Chart from "react-google-charts";

// Modal.setAppElement('#root');

class FereastraGrafic extends React.Component{

    constructor(props) {
        super(props);

        this.subtitle = "";
        this.state = {
            modalIsOpen: false
        }

        this.openModal = this.openModal.bind(this)
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.closeModal = this.closeModal.bind(this)


    }

    componentDidMount() {

    }

    openModal() {
        this.setState({modalIsOpen: true})
    }

     afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

     closeModal() {
         this.setState({modalIsOpen: false})
    }

    render (){
        return (
        <div>
            <button className="btn btn-secondary m-auto" onClick={this.openModal}>Afiseaza grafic</button>
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal">

                <h2 ref={(_subtitle) => (this.subtitle = _subtitle)}>Grafic Regresie</h2>

                <div className="container">
                    <div className="row">
                        <div className="col-6" style={{width: 600, height: 400, maxWidth: "100%"}}>
                            <Chart
                                key={this.state.minX}
                                width={'600px'}
                                height={'400px'}
                                chartType="ScatterChart"
                                loader={<div>Loading Chart</div>}
                                /*data={[
                                    ['Varsta', 'Numar ore necesare'],
                                    [30, 3], [50, 5], [22, 2], [36, 4], [25, 1], [41, 4],
                                    [61, 7], [55, 6], [24, 2], [38, 3], [44, 4], [20, 2], [50, 4],
                                    [43, 3], [62, 6], [33, 3], [36, 3], [43, 5], [20, 1], [31, 2]
                                ]}*/
                                data={this.props.setDate}
                                options={{
                                    title: 'Comparare vasta si ore necesare pentru adaptarea la noul soft',
                                    hAxis: { title: this.props.setDate[0][0], minValue: this.props.limite.minX, maxValue: this.props.limite.maxX },
                                    vAxis: { title: this.props.setDate[0][1], minValue: this.props.limite.minY, maxValue: this.props.limite.maxY },
                                    legend: 'none',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />

                        </div>

                        <div className="col-4">
                            <h5>Raport</h5>
                            <p> Coeficientul de corelație calculat este R = 0,9312, iar deoarece este mai mare decât 0.7, putem afirma că există legătură între răspunsurile întrebărilor.</p>
                            <p>Coeficientul de determinație este R^2= 0.8672, ceea ce înseamnă că 83.72% din modificarea variabilei „număr ore necesare” este determinată de modificarea variabilei „vârstă”.</p>
                        </div>
                    </div>

                    <div className="row">
                        <p>{JSON.stringify(this.props.regresie)}</p>
                    </div>
                </div>

                <div className={"d-flex justify-content-end"}>
                    <button className="btn btn-secondary m-auto" onClick={this.closeModal}>Inchide</button>
                </div>

            </Modal>
        </div>
        )
    }
}

export default FereastraGrafic;