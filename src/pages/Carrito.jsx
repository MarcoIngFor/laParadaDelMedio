import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import SelectorCantidad from '../components/molecules/SelectorCantidad'
import '../styles/Carrito.css'

function Carrito() {
  const {
    carrito,
    totalUnidades,
    totalPrecio,
    errorCarrito,
    cambiarCantidad,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito()

  const formatoPrecio = (precio) =>
    `$${Number(precio).toLocaleString('es-CL')}`

  return (
    <section className="carrito-pagina">
      <div className="container">
        <div className="carrito-encabezado">
          <h1>Mi carrito</h1>

          <Link to="/productos" className="carrito-boton">
            Seguir comprando
          </Link>
        </div>

        {errorCarrito && (
          <p className="alert alert-danger" role="alert">
            {errorCarrito}
          </p>
        )}

        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <h2>Tu carrito está vacío</h2>
            <p>Agrega productos desde nuestro catálogo.</p>
          </div>
        ) : (
          <>
            <div className="carrito-lista">
              {carrito.map((producto) => (
                <article
                  key={producto.codigo}
                  className="carrito-producto"
                >
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="carrito-imagen"
                    />
                  ) : (
                    <div className="carrito-sin-imagen">
                      Sin imagen
                    </div>
                  )}

                  <div className="carrito-informacion">
                    <h2>{producto.nombre}</h2>

                    {producto.disponible ? (
                      <>
                        <p>Precio: {formatoPrecio(producto.precio)}</p>
                        <p>Stock disponible: {producto.stock}</p>

                        <SelectorCantidad
                          cantidad={producto.cantidad}
                          maximo={producto.stock}
                          onCambiar={(cantidad) =>
                            cambiarCantidad(producto.codigo, cantidad)
                          }
                        />

                        {producto.cantidad > producto.stock && (
                          <p className="text-danger">
                            El stock cambió. Reduce la cantidad o elimina
                            el producto.
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-danger">
                        Este producto ya no está disponible. Elimínalo
                        del carrito.
                      </p>
                    )}
                  </div>

                  <div className="carrito-subtotal">
                    {producto.disponible && (
                      <p>
                        Subtotal:{' '}
                        <strong>
                          {formatoPrecio(
                            producto.precio * producto.cantidad
                          )}
                        </strong>
                      </p>
                    )}

                    <button
                      type="button"
                      className="carrito-boton carrito-eliminar"
                      onClick={() => eliminarProducto(producto.codigo)}
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="carrito-resumen">
              <h2>Resumen</h2>
              <p>Unidades: {totalUnidades}</p>

              <p className="carrito-total">
                Total: {formatoPrecio(totalPrecio)}
              </p>

              <div className="carrito-acciones">
                <button
                  type="button"
                  className="carrito-boton carrito-eliminar"
                  onClick={() => {
                    if (window.confirm('¿Deseas vaciar el carrito?')) {
                      vaciarCarrito()
                    }
                  }}
                >
                  Vaciar carrito
                </button>

                <button
                  type="button"
                  className="carrito-boton"
                  disabled
                >
                  Checkout — Próximamente
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Carrito