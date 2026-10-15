import { Link } from 'react-router-dom'
import TarjetaProducto from '../components/molecules/TarjetaProducto'
import { obtenerCatalogo } from '../data/Catalogo'

function Ofertas() {
  const ofertas = obtenerCatalogo().filter(
    (producto) => producto.enOferta
  )

  return (
    <section className="container-fluid px-4 py-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h1 className="text-success">Ofertas</h1>
          <p className="mb-0">Encuentra nuestros productos con precio rebajado.</p>
        </div>

        <Link
          to="/productos"
          className="btn btn-success"
          style={{
            backgroundColor: '#006400',
            borderColor: '#006400',
          }}
        >
          Ver todo el catálogo
        </Link>
      </div>

      {ofertas.length === 0 ? (
        <p className="text-center py-4">
          Actualmente no hay productos en oferta.
        </p>
      ) : (
        <div className="row g-4">
          {ofertas.map((producto) => (
            <div
              key={producto.codigo}
              className="col-12 col-sm-6 col-md-4 col-xl-2"
            >
              <TarjetaProducto
                codigo={producto.codigo}
                nombre={producto.nombre}
                precio={producto.precio}
                imagen={producto.imagen}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Ofertas