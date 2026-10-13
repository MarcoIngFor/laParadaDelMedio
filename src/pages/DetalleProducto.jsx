import { Link, useParams } from 'react-router-dom'
import { obtenerCatalogo } from '../data/Catalogo'
import '../styles/DetalleProducto.css'


function DetalleProducto() {
  const productos = obtenerCatalogo()
  
  const { codigo } = useParams()

  const producto = productos.find(
    (producto) => producto.codigo === codigo
  )

  if (!producto) {
    return (
      <section className="container py-5">
        <h1>Producto no encontrado</h1>
            <Link to="/productos" className="boton-volver">
                Volver al catálogo
            </Link>
      </section>
    )
  }

  return (
    <section className="container py-5">
      <article className="detalle-producto">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-6">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="detalle-imagen"
            />
          </div>

          <div className="col-12 col-md-6">
            <h1 className="detalle-titulo">{producto.nombre}</h1>

            <p>
              {producto.descripcion ||
                'Producto disponible en La Parada del Medio'}
            </p>

            <p className="detalle-precio">
              Precio: ${producto.precio.toLocaleString('es-CL')}
            </p>

            <p>Stock disponible: {producto.stock}</p>
            <p>Categoría: {producto.categoria}</p>

            <Link to="/productos" className="boton-volver">
                Volver al catálogo
            </Link>
          </div>
        </div>
      </article>
    </section>
  )
}

export default DetalleProducto