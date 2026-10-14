import { useState } from 'react'
import { obtenerPedidos } from '../../data/Pedidos'
import { nombresRegiones } from '../../data/Regiones'

function cargarPedidos() {
  try {
    return {
      pedidos: obtenerPedidos(),
      error: '',
    }
  } catch {
    return {
      pedidos: [],
      error: 'No se pudieron leer los pedidos guardados.',
    }
  }
}

function ListaPedidos() {
  const [carga] = useState(cargarPedidos)
  const [seleccionado, setSeleccionado] = useState(null)

  const pedidos = [...carga.pedidos].sort(
    (primero, segundo) =>
      new Date(segundo.fecha) - new Date(primero.fecha)
  )

  const formatoPrecio = (precio) =>
    `$${Number(precio).toLocaleString('es-CL')}`

  const totalVentas = pedidos.reduce(
    (total, pedido) => total + Number(pedido.total),
    0
  )

  if (carga.error) {
    return (
      <p className="alert alert-danger" role="alert">
        {carga.error}
      </p>
    )
  }

  return (
    <>
      <section className="gestion-tabla">
        <h2>Pedidos registrados: {pedidos.length}</h2>

        <p>
          Total de compras simuladas:{' '}
          <strong>{formatoPrecio(totalVentas)}</strong>
        </p>

        {pedidos.length === 0 ? (
          <p>Todavía no hay pedidos registrados.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">Pedido</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Entrega</th>
                  <th scope="col">Total</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.codigo}>
                    <td title={pedido.codigo}>
                      {pedido.codigo.slice(0, 8)}
                    </td>

                    <td>
                      {new Date(pedido.fecha).toLocaleString('es-CL')}
                    </td>

                    <td>
                      {pedido.cliente.nombre}{' '}
                      {pedido.cliente.apellido}
                    </td>

                    <td>
                      {pedido.cliente.entrega === 'retiro'
                        ? 'Retiro'
                        : 'Despacho simulado'}
                    </td>

                    <td>{formatoPrecio(pedido.total)}</td>

                    <td>
                      <span className="badge text-bg-warning">
                        {pedido.estado}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="gestion-boton"
                        onClick={() => setSeleccionado(pedido)}
                        aria-expanded={
                          seleccionado?.codigo === pedido.codigo
                        }
                        aria-controls="detalle-pedido"
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {seleccionado && (
        <section
          id="detalle-pedido"
          className="gestion-tabla"
          aria-label="Detalle del pedido seleccionado"
        >
          <h2>Detalle del Pedido</h2>

          <p style={{ overflowWrap: 'anywhere' }}>
            <strong>Código:</strong> {seleccionado.codigo}
          </p>

          <p>
            <strong>Fecha:</strong>{' '}
            {new Date(seleccionado.fecha).toLocaleString('es-CL')}
          </p>

          <p>
            <strong>Cliente:</strong>{' '}
            {seleccionado.cliente.nombre}{' '}
            {seleccionado.cliente.apellido}
          </p>

          <p>
            <strong>Correo:</strong>{' '}
            {seleccionado.cliente.correo}
          </p>

          <p>
            <strong>Teléfono:</strong>{' '}
            {seleccionado.cliente.telefono}
          </p>

          <p>
            <strong>Entrega:</strong>{' '}
            {seleccionado.cliente.entrega === 'retiro'
              ? 'Retiro en el almacén'
              : 'Despacho a domicilio — simulado'}
          </p>

          {seleccionado.cliente.entrega === 'despacho' && (
            <>
              <p>
                <strong>Región:</strong>{' '}
                {nombresRegiones[seleccionado.cliente.region] ||
                  seleccionado.cliente.region}
              </p>

              <p>
                <strong>Comuna:</strong>{' '}
                {seleccionado.cliente.comuna}
              </p>

              <p>
                <strong>Dirección:</strong>{' '}
                {seleccionado.cliente.direccion}
              </p>
            </>
          )}

          <p>
            <strong>Pago simulado:</strong> {seleccionado.pago}
          </p>

          <p>
            <strong>Estado del pedido:</strong> {seleccionado.estado}
          </p>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Precio unitario</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {seleccionado.productos.map((producto) => (
                  <tr key={producto.codigo}>
                    <td>{producto.nombre}</td>
                    <td>{formatoPrecio(producto.precio)}</td>
                    <td>{producto.cantidad}</td>
                    <td>{formatoPrecio(producto.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="fs-4 text-success">
            <strong>
              Total: {formatoPrecio(seleccionado.total)}
            </strong>
          </p>

          <button
            type="button"
            className="gestion-boton"
            onClick={() => setSeleccionado(null)}
          >
            Cerrar detalle
          </button>
        </section>
      )}
    </>
  )
}

export default ListaPedidos