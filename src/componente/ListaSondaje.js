import React from 'react';
import MeniuSondaj from "./MeniuSondaj";
import MeniuInapoi from "./MeniuInapoi";
import MeniuAdaugareSondajNou from "./MeniuAdaugareSondajNou";
import MeniuLogOut from "./MeniuLogOut";
import FirebaseInstance from "../Firebase";

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
            sondajeleMele: []
        }
    }

    componentDidMount() {
        //Luam sondajele
        FirebaseInstance().getCurrentUserSondaje().then((sondaje) => {
            this.setState({sondajeleMele: sondaje})
        })
    }

    render() {
        return(
            <div className={"img-container "} id={"imagineSondaje"}>
                <div className={"fundal-carduri d-flex flex-column"}>
                    <MeniuLogOut/>
                    <div className={"lista-carduri"}>
                        <MeniuAdaugareSondajNou/>
                        {
                            this.state.sondajeleMele.map((sondaj, index) => {
                                return <MeniuSondaj key={index} sondaj={sondaj}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ListaSondaje;