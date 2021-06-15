import IntrebareRaspunsDeschis from "./intrebari_sondaj/IntrebareRaspunsDeschis";
import IntrebareRaspunsMultiplu from "./intrebari_sondaj/IntrebareRaspunsMultiplu";
import IntrebareRaspunsSimplu from "./intrebari_sondaj/IntrebareRaspunsSimplu";
import React from "react";
import {INTREBARE_RASPUNS_DESCHIS, INTREBARE_RASPUNS_MULTIPLU, INTREBARE_RASPUNS_SIMPLU} from "./intrebari_sondaj/EnumTipIntrebari";

function renderVectorIntrebari(intrebari) {
    return (
        intrebari.map((intrebare, index) => {
        // returneaza elementul si paseaza cheia
        if (intrebare.tip === INTREBARE_RASPUNS_DESCHIS) {
            return (
                <div>
                    <IntrebareRaspunsDeschis key={index} detalii={intrebare.detalii}/>
                </div>
            )
        } else if (intrebare.tip === INTREBARE_RASPUNS_MULTIPLU) {
            return (
                <div>
                    <IntrebareRaspunsMultiplu key={index} detalii={intrebare.detalii}/>
                </div>
            )
        } else if (intrebare.tip === INTREBARE_RASPUNS_SIMPLU) {
            return (
                <div>
                    <IntrebareRaspunsSimplu key={index} detalii={intrebare.detalii}/>
                </div>
            )
        } else {
            console.log("Nu am putut coverti intrebarea " + intrebare + " in componenta!")
            return (<div key={index}>Componenta invalida!</div>)
        }
    })
    )
}

export {renderVectorIntrebari}