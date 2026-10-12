import { categorias } from '../../data/Categorias'
import TarjetaCategoria from '../molecules/TarjetaCategoria'
import '../../styles/Categorias.css'

function Categorias() {
  return (
    <section className="categorias-tienda">
      <div className="container-fluid px-4">
        <h2 className="categorias-titulo">Nuestras Categorías</h2>

        <div className="row g-4">
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              className="col-12 col-md-6 col-lg-4"
            >
              <TarjetaCategoria
                nombre={categoria.nombre}
                imagen={categoria.imagen}
                enlace={categoria.enlace}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categorias