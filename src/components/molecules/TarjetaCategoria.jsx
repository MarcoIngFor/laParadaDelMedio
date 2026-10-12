function TarjetaCategoria({ nombre, imagen, enlace }) {
  return (
    <a href={enlace} className="tarjeta-categoria">
      <img
        src={imagen}
        alt={`Ver productos de ${nombre}`}
        className="imagen-categoria"
      />
    </a>
  )
}

export default TarjetaCategoria