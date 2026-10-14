import { Link, useParams } from 'react-router-dom'
import { obtenerPedidos } from '../data/Pedidos'
import '../styles/Checkout.css'

function CompraExitosa() {
  const { codigo } = useParams()

  let pedido = null

  try {
    pedido = obtenerPedidos().find((pedido) => pedido.codigo === codigo)
  } catch {
    pedido = null
  }

  if (!pedido) {
    return (
      <section className="checkout-pagina">
        <div className="container checkout-tarjeta">
          <h1>Comprobante no disponible</h1>
          <Link to="/productos" className="checkout-boton">
            Volver al catálogo
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="checkout-pagina">
      <div className="container checkout-tarjeta">
        <h1>¡Compra simulada exitosa!</h1>
        <p>Tu pedido quedó registrado. No se realizó ningún cobro.</p>

        <p><strong>Pedido:</strong> {pedido.codigo}</p>
        <p>
          <strong>Fecha:</strong>{' '}
          {new Date(pedido.fecha).toLocaleString('es-CL')}
        </p>
        <p>
          <strong>Cliente:</strong>{' '}
          {pedido.cliente.nombre} {pedido.cliente.apellido}
        </p>
        <p><strong>Correo:</strong> {pedido.cliente.correo}</p>

        <p>
          <strong>Entrega:</strong>{' '}
          {pedido.cliente.entrega === 'retiro'
            ? 'Retiro en el almacén'
            : 'Despacho a domicilio — simulado'}
        </p>

        {pedido.cliente.entrega === 'despacho' && (
          <p>
            <strong>Dirección:</strong>{' '}
            {pedido.cliente.direccion}, {pedido.cliente.comuna}
          </p>
        )}

        <h2 className="mt-4">Productos</h2>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {pedido.productos.map((producto) => (
                <tr key={producto.codigo}>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                  <td>${producto.subtotal.toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="checkout-total">
          Total: ${pedido.total.toLocaleString('es-CL')}
        </p>

        <Link to="/productos" className="checkout-boton">
          Seguir comprando
        </Link>
      </div>
    </section>
  )
}

export default CompraExitosa