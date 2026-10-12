import { Link } from 'react-router-dom'
import '../../styles/TarjetaBlog.css'

function TarjetaBlog({ imagen, titulo, resumen, enlace }) {
  return (
    <article className="tarjeta-blog">
      <img
        src={imagen}
        alt={titulo}
        className="blog-imagen"
      />

      <div className="blog-contenido">
        <h2>{titulo}</h2>

        <p>{resumen}</p>

        <Link to={enlace} className="blog-leer">
          Leer más
        </Link>
      </div>
    </article>
  )
}

export default TarjetaBlog