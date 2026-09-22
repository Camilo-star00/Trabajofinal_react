import Tortu from "./Tortu";
import BotonDerecho from './BotonDerecho';
import BotonIzquierdo from "./BotonIzquierdo";
import BotonReinicio from "./BotonReinicio";
import { useState } from "react";

function Escenario() {
    const [posicion, setPosicion] = useState(0);

    const LIMITE = 150; // la tortuga puede ir de -150 a 150

    function limitarOReiniciar(valor) {
        if (valor < -LIMITE || valor > LIMITE) {
            return 0;
        }
        return valor;
    }

    function moverDerecha() {
        setPosicion(limitarOReiniciar(posicion + 5));
    }

    function moverIzquierda() {
        setPosicion(limitarOReiniciar(posicion - 5));
    }

    return (
        <div className="mx-auto w-[525px] h-[300px] my-8 rounded-lg overflow-hidden text-center relative">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">vos sos liebre no y yo una tortuga</h2>
                <Tortu posicion={posicion} />
                <p className="relative z-10 mt-2 text-sm font-bold text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-slate-800/60 inline-block px-3 py-1 rounded-md">Posición actual: {posicion} px</p>
                <div className="relative z-10 mt-4 flex justify-center gap-3">
                    <BotonIzquierdo mover={moverIzquierda} />
                    <BotonReinicio mover={() => setPosicion(0)} />
                    <BotonDerecho mover={moverDerecha} />
                </div>
            </div>
    )
}
export default Escenario;