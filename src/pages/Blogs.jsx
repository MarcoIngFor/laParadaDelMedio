import TarjetaBlog from '../components/molecules/TarjetaBlog'
import '../styles/Blogs.css'

function Blogs() {
  return (
    <section className="blogs-pagina">
      <div className="container">
        <h1 className="blogs-titulo">Noticias y Consejos</h1>

        <div className="row g-4">
          <div className="col-12 col-md-6">
            <TarjetaBlog
              imagen="/img/blog/ahorro.png"
              titulo="Cómo ahorrar en tus compras del mes"
              resumen="Algunos pequeños cambios al momento de comprar pueden ayudarte a organizar mejor tu presupuesto."
              enlace="/blog/ahorro"
            />
          </div>

          <div className="col-12 col-md-6">
            <TarjetaBlog
              imagen="/img/blog/organizacion.png"
              titulo="Consejos para organizar tu despensa"
              resumen="Mantener los productos ordenados permite aprovechar mejor el espacio y evitar desperdicios."
              enlace="/blog/organizacion"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blogs