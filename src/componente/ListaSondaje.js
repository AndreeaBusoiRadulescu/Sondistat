import React from 'react';
import MeniuSondaj from "./MeniuSondaj";
import MeniuInapoi from "./MeniuInapoi";
import MeniuAdaugareSondajNou from "./MeniuAdaugareSondajNou";
import MeniuLogOut from "./MeniuLogOut";

class ListaSondaje extends React.Component{
    render() {
        return(
            <div className={"img-container "} id={"imagineSondaje"}>
                <div className={"sondaje d-flex flex-column"}>
                    <MeniuLogOut/>
                    <div className={"listaSondaje"}>
                        <MeniuAdaugareSondajNou/>
                        <MeniuSondaj/>
                        <MeniuSondaj/>
                        <MeniuSondaj/>
                        <MeniuSondaj/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListaSondaje;