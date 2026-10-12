import { Link } from 'react-router-dom'
import '../../styles/ArticuloBlog.css'

function ArticuloBlog({ imagen, titulo, children }) {
  return (
    <section className="articulo-blog-pagina">
      <article className="articulo-blog">
        <img
          src={imagen}
          alt={titulo}
          className="articulo-blog-imagen"
        />

        <h1>{titulo}</h1>

        <div className="articulo-blog-texto">
          {children}
        </div>

        <Link to="/blog" className="articulo-blog-volver">
          Volver al Blog
        </Link>
      </article>
    </section>
  )
}

export default ArticuloBlog