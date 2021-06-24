import IntrebareRaspunsDeschis from "./intrebari_sondaj/IntrebareRaspunsDeschis";
import IntrebareRaspunsMultiplu from "./intrebari_sondaj/IntrebareRaspunsMultiplu";
import IntrebareRaspunsSimplu from "./intrebari_sondaj/IntrebareRaspunsSimplu";
import React from "react";
import {INTREBARE_RASPUNS_DESCHIS, INTREBARE_RASPUNS_MULTIPLU, INTREBARE_RASPUNS_SIMPLU} from "./intrebari_sondaj/EnumTipIntrebari";

function renderVectorIntrebari(intrebari, vectorReferinte = []) {

    return (
        intrebari.map((intrebare, index) => {
            // returneaza elementul si paseaza cheia

            let componentaCreata
            let referintaComponenta = vectorReferinte[index]

            if (intrebare.tip === INTREBARE_RASPUNS_DESCHIS) {
                componentaCreata = (
                    <div>
                        <IntrebareRaspunsDeschis key={index} detalii={intrebare.detalii} ref={referintaComponenta}/>
                    </div>
                )
            } else if (intrebare.tip === INTREBARE_RASPUNS_MULTIPLU) {
                componentaCreata = (
                    <div>
                        <IntrebareRaspunsMultiplu key={index} detalii={intrebare.detalii} ref={referintaComponenta}/>
                    </div>
                )
            } else if (intrebare.tip === INTREBARE_RASPUNS_SIMPLU) {
                componentaCreata = (
                    <div>
                        <IntrebareRaspunsSimplu key={index} detalii={intrebare.detalii} ref={referintaComponenta}/>
                    </div>
                )
            } else {
                console.log("Nu am putut coverti intrebarea " + intrebare + " in componenta!")
                componentaCreata = (
                    <div key={index}>Componenta invalida!</div>
                )
            }
            return componentaCreata
        })
    )
}

export {renderVectorIntrebari}