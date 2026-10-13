function TarjetaAdmin({ titulo, descripcion, children }) {
  return (
    <article className="tarjeta-admin">
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
      <div className="tarjeta-admin-contenido">{children}</div>
    </article>
  )
}

export default TarjetaAdmin