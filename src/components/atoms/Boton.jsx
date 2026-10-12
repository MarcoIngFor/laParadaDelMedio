function Boton({texto, onClick}){
    return(
        <button type="button" className="btn btn-danger" onClick={onClick}>
            {texto}
        </button>
    )
}

export default Boton