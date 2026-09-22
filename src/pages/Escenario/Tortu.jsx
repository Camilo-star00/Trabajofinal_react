function Tortu({ posicion }) {
    return (
        <div
            style={{
                fontSize: "60px",
                position: "relative",
                left: `${posicion}px`,
                transition: "left 0.2s",
                display: "inline-block",
                transform: "scaleX(-1)"
            }}
        >
            🐢
        </div>
    )
}

export default Tortu;