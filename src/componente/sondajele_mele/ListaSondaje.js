import React from 'react';
import MeniuSondaj from "../meniuri_componente/MeniuSondaj";
import MeniuInapoi from "../meniuri_navigare/MeniuInapoi";
import MeniuAdaugareSondajNou from "../meniuri_componente/MeniuAdaugareSondajNou";
import MeniuLogOut from "../meniuri_navigare/MeniuLogOut";
import DatabaseInstance from "../../Database";
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
        // FirebaseInstance().saveSondaj("titlu", "descriere", "intrebari_sondaj");
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
        DatabaseInstance().getCurrentUserSondaje().then((sondaje) => {
            this.setState({sondajeleMele: sondaje})
            console.log(sondaje)
        })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({snackbar: false})
        // event.setOpen(false);
    };

    render() {


        let timpTrecutDeLaLogare = (+ new Date()) - (window.sessionStorage.getItem('loggedTimestamp'))
        let primaLogare = timpTrecutDeLaLogare < 9000
        console.log(primaLogare)
        console.log(timpTrecutDeLaLogare)

        return(
            <div className={"img-container"} id={"imagineSondaje"}>
                <MeniuLogOut/>
                <div className={"main-container d-flex flex-row justify-content-center"}>
                    <div className={"lista-carduri d-flex flex-column justify-content-center"}>
                        <MeniuAdaugareSondajNou/>
                        <div className={"d-flex flex-column justify-content-start mr-3"} id={"scrolabil"}>
                        {
                            this.state.sondajeleMele.map((sondaj, index) => {
                                return <MeniuSondaj key={index} sondaj={sondaj}/>
                            })
                        }
                        </div>
                    </div>
                </div>

                {
                    primaLogare &&
                    <Snackbar open={this.state.snackbar} onClose={this.handleClose} autoHideDuration={3000} >
                        <Alert  severity="success">
                           Te-ai logat cu succes!
                        </Alert>
                    </Snackbar>
                }
            </div>

        )
    }
}

export default ListaSondaje;