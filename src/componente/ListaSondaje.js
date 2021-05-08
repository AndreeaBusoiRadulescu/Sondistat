import React from 'react';
import MeniuSondaj from "./MeniuSondaj";
import MeniuInapoi from "./MeniuInapoi";
import MeniuAdaugareSondajNou from "./MeniuAdaugareSondajNou";
import MeniuLogOut from "./MeniuLogOut";
import FirebaseInstance from "../Firebase";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ListaSondaje extends React.Component{

    constructor() {
        super();
        // console.log(FirebaseInstance().getCurrentUser())
        // console.log(FirebaseInstance().getCurrentUser().id)
        // Teste
        //Adaugare formular fake
        // FirebaseInstance().saveSondaj("titlu", "descriere", "intrebari");
        // FirebaseInstance().getUserSondaje().then((formulare) => {
        //     console.log(formulare)
        // })
        this.state = {
            sondajeleMele: [],
            snackbar: true
        }
    }

    componentDidMount() {
        //Luam sondajele
        FirebaseInstance().getCurrentUserSondaje().then((sondaje) => {
            this.setState({sondajeleMele: sondaje})
        })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({"snackbar": false})
        // event.setOpen(false);
    };

    render() {
        return(
            <div className={"img-container "}>
                <MeniuLogOut/>
                <div className={"main-container d-flex flex-row justify-content-center"}>
                    <div className={"lista-carduri d-flex flex-column justify-content-center"}>
                        <MeniuAdaugareSondajNou/>
                        <div className={"d-flex flex-column justify-content-center mr-3"} id={"scrolabil"}>
                        {
                            this.state.sondajeleMele.map((sondaj, index) => {
                                return <MeniuSondaj key={index} sondaj={sondaj}/>
                            })
                        }
                        </div>
                    </div>
                </div>

                <Snackbar open={this.state.snackbar} onClose={this.handleClose} autoHideDuration={3000} >
                    <Alert  severity="success">
                       Te-ai logat cu succes!
                    </Alert>
                </Snackbar>
            </div>

        )
    }
}

export default ListaSondaje;