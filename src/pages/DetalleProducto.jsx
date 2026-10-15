import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { obtenerCatalogo } from '../data/Catalogo'
import { useCarrito } from '../context/CarritoContext'
import SelectorCantidad from '../components/molecules/SelectorCantidad'
import '../styles/DetalleProducto.css'

function CompraProducto({ producto }) {
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')

  const { agregarProducto } = useCarrito()
  const stock = Number(producto.stock)

  function agregar() {
    const resultado = agregarProducto(producto.codigo, cantidad)
    setMensaje(resultado.mensaje)

    if (resultado.correcto) {
      setCantidad(1)
    }
  }

  return (
    <div className="mb-4">
      <SelectorCantidad
        cantidad={cantidad}
        maximo={stock}
        onCambiar={(numero) => {
          setCantidad(numero)
          setMensaje('')
        }}
      />

      <button
        type="button"
        className="btn btn-success"
        style={{
          backgroundColor: '#006400',
          borderColor: '#006400',
        }}
        onClick={agregar}
        disabled={stock < 1}
      >
        {stock < 1 ? 'Sin stock' : 'Agregar al carrito'}
      </button>

      <p className="small mt-2 mb-0" role="status">
        {mensaje}
      </p>
    </div>
  )
}

function DetalleProducto() {
  const { codigo } = useParams()
  const location = useLocation()

  const producto = obtenerCatalogo().find(
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
            <h1 className="detalle-titulo">{producto.nombre}</h1>

            <p>
              {producto.descripcion ||
                'Producto disponible en La Parada del Medio'}
            </p>

            {producto.enOferta && (
              <p>
                <span className="badge text-bg-warning me-2">Oferta</span>
                Precio normal:{' '}
                <del>
                  ${producto.precioOriginal.toLocaleString('es-CL')}
                </del>
              </p>
            )}

            <p className="detalle-precio">
              {producto.enOferta ? 'Precio de oferta' : 'Precio'}:{' '}
              ${Number(producto.precio).toLocaleString('es-CL')}
            </p>

            <p>Stock disponible: {producto.stock}</p>
            <p>Categoría: {producto.categoria}</p>

            {!desdeGestion && (
              <CompraProducto
                key={producto.codigo}
                producto={producto}
              />
            )}

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