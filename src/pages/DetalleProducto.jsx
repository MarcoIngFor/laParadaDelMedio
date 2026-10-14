import { Link, useLocation, useParams } from 'react-router-dom'
import { obtenerCatalogo } from '../data/Catalogo'
import '../styles/DetalleProducto.css'

function DetalleProducto() {
  const { codigo } = useParams()
  const location = useLocation()

  const productos = obtenerCatalogo()

  const producto = productos.find(
    (producto) => producto.codigo === codigo
  )

  const desdeGestion =
    location.state?.desde === '/admin/productos'

  const destinoVolver = desdeGestion
    ? '/admin/productos'
    : '/productos'

  const textoVolver = desdeGestion
    ? 'Volver a Gestión de Productos'
    : 'Volver al catálogo'

  if (!producto) {
    return (
      <section className="container py-5">
        <article className="detalle-producto">
          <h1>Producto no encontrado</h1>

          <Link to={destinoVolver} className="boton-volver">
            {textoVolver}
          </Link>
        </article>
      </section>
    )
  }

  return (
    <section className="container py-5">
      <article className="detalle-producto">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-6">
            {producto.imagen ? (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="detalle-imagen"
              />
            ) : (
              <p className="text-center">Producto sin imagen</p>
            )}
          </div>

          <div className="col-12 col-md-6">
            <h1 className="detalle-titulo">
              {producto.nombre}
            </h1>

            <p>
              {producto.descripcion ||
                'Producto disponible en La Parada del Medio'}
            </p>

            <p className="detalle-precio">
              Precio: ${Number(producto.precio).toLocaleString('es-CL')}
            </p>

            <p>Stock disponible: {producto.stock}</p>
            <p>Categoría: {producto.categoria}</p>

            <Link to={destinoVolver} className="boton-volver">
              {textoVolver}
            </Link>
          </div>
        </div>
      </article>
    </section>
  )
}

export default DetalleProducto