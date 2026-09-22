import Tortu from "./Tortu";
import BotonDerecho from './BotonDerecho';
import BotonIzquierdo from "./BotonIzquierdo";
import BotonReinicio from "./BotonReinicio";
import { useState } from "react";
import "./Escenario.css";

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
        <div className="Escenario">
            <h2>vos sos liebre no y yo una tortuga</h2>
            <Tortu posicion={posicion} />
            <p className="posicion-texto">Posición actual: {posicion} px</p>
            <div className="botones">
                <BotonIzquierdo mover={moverIzquierda} />
                <BotonReinicio mover={() => setPosicion(0)} />
                <BotonDerecho mover={moverDerecha} />
            </div>
        </div>
    )
}
export default Escenario;