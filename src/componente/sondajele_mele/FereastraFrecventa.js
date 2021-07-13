import React from "react";
import Modal from "react-modal";
import Chart from "react-google-charts";

// Modal.setAppElement('#root');

class FereastraRegresie extends React.Component{

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
            <button className="btn btn-secondary m-auto" onClick={this.openModal}>Afiseaza grafic de frecventa</button>
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal">

                <h2 ref={(_subtitle) => (this.subtitle = _subtitle)}>Grafic Frecventa</h2>

                <div className="container">
                    <div className="row">
                        <div className="col-6" style={{width: 600, height: 400, maxWidth: "100%"}}>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={this.props.setDate}
                                options={{
                                    title: 'Frecventa raspunsurilor',
                                    sliceVisibilityThreshold: 0
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </div>

                        <div className="col-4">
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="BarChart"
                                loader={<div>Loading Chart</div>}
                                data={this.props.setDate}
                                options={{
                                    title: 'Frecventa raspunsurilor',
                                    chartArea: { width: '50%' },
                                    hAxis: {
                                        title: 'Numarul de raspunsuri',
                                        minValue: 0,
                                    },
                                    vAxis: {
                                        title: 'Variante de raspuns',
                                    },
                                    legend: 'none'
                                }}
                                // For tests
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </div>
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

export default FereastraRegresie;