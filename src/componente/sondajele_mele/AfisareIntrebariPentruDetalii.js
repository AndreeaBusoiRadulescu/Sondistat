import SablonSelectareRaspunsMultiplu from "./sablon_selectare_intrebari/SablonSelectareRaspunsMultiplu";
import SablonSelectareRaspunsSimplu from "./sablon_selectare_intrebari/SablonSelectareRaspunsSimplu";
import SablonSelectareRaspunsDeschis from "./sablon_selectare_intrebari/SablonSelectareRaspunsDeschis";
import React from "react";
import {INTREBARE_RASPUNS_DESCHIS, INTREBARE_RASPUNS_MULTIPLU, INTREBARE_RASPUNS_SIMPLU} from "../intrebari_sondaj/EnumTipIntrebari";

function renderVectorIntrebariDetalii(intrebari, vectorReferinte = []) {

    return (
        intrebari.map((intrebare, index) => {
            // returneaza elementul si paseaza cheia

            let componentaCreata
            let referintaComponenta = vectorReferinte[index]

            if (intrebare.tip === INTREBARE_RASPUNS_DESCHIS) {
                componentaCreata = (
                    <div>
                        <SablonSelectareRaspunsDeschis key={index} detalii={intrebare.detalii} ref={referintaComponenta}/>
                    </div>
                )
            } else if (intrebare.tip === INTREBARE_RASPUNS_MULTIPLU) {
                componentaCreata = (
                    <div>
                        <SablonSelectareRaspunsMultiplu key={index} detalii={intrebare.detalii} ref={referintaComponenta}/>
                    </div>
                )
            } else if (intrebare.tip === INTREBARE_RASPUNS_SIMPLU) {
                componentaCreata = (
                    <div>
                        <SablonSelectareRaspunsSimplu key={index} detalii={intrebare.detalii} ref={referintaComponenta}/>
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

export {renderVectorIntrebariDetalii}