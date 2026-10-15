import { useState } from 'react'
import { Link } from 'react-router-dom'
import SelectorCantidad from './SelectorCantidad'
import { useCarrito } from '../../context/CarritoContext'
import { obtenerCatalogo } from '../../data/Catalogo'
import '../../styles/TarjetaProducto.css'

function TarjetaProducto({ codigo, nombre, precio, imagen }) {
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')

  const { agregarProducto } = useCarrito()

  const producto = obtenerCatalogo().find(
    (producto) => producto.codigo === codigo
  )

  const stock = Number(producto?.stock || 0)
  const precioActual = producto?.precio ?? precio

  function agregarAlCarrito() {
    const resultado = agregarProducto(codigo, cantidad)
    setMensaje(resultado.mensaje)

    if (resultado.correcto) {
      setCantidad(1)
    }
  }

  return (
    <article className="card h-100 tarjeta-producto">
      <Link to={`/productos/${encodeURIComponent(codigo)}`}>
        {imagen ? (
          <img
            src={imagen}
            alt={nombre}
            className="card-img-top imagen-producto"
          />
        ) : (
          <div
            className="imagen-producto"
            style={{
              height: 280,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            Sin imagen
          </div>
        )}
      </Link>

      <div className="card-body">
        <h2 className="card-title h5">{nombre}</h2>

        <p className="producto-precio">
          {producto?.enOferta && (
            <>
              <span className="badge text-bg-warning mb-2">Oferta</span>
              <br />
              <del className="text-secondary small">
                ${producto.precioOriginal.toLocaleString('es-CL')}
              </del>
              <br />
            </>
          )}

          ${Number(precioActual).toLocaleString('es-CL')}
        </p>

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
          className="btn btn-danger"
          onClick={agregarAlCarrito}
          disabled={stock < 1}
        >
          {stock < 1 ? 'Sin stock' : 'Agregar al carrito'}
        </button>

        <p className="small mt-2 mb-0" role="status">
          {mensaje}
        </p>
      </div>
    </article>
  )
}

export default TarjetaProducto