import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { regiones, nombresRegiones } from '../data/Regiones'
import '../styles/Checkout.css'

function datosIniciales() {
  let usuario = null

  try {
    const sesion = JSON.parse(localStorage.getItem('usuarioSesion'))
    const rol = localStorage.getItem('usuarioActivo')

    if (sesion?.tipoUsuario === rol) {
      usuario = sesion
    }
  } catch {
    usuario = null
  }

  return {
    nombre: usuario?.nombre || '',
    apellido: usuario?.apellido || '',
    correo: usuario?.correo || '',
    telefono: usuario?.telefono || '',
    region: usuario?.region || '',
    comuna: usuario?.comuna || '',
    direccion: usuario?.direccion || '',
    entrega: 'retiro',
  }
}

const campos = [
  { nombre: 'nombre', etiqueta: 'Nombres', tipo: 'text' },
  { nombre: 'apellido', etiqueta: 'Apellidos', tipo: 'text' },
  { nombre: 'correo', etiqueta: 'Correo electrónico', tipo: 'email' },
  { nombre: 'telefono', etiqueta: 'Teléfono de 9 dígitos', tipo: 'tel' },
]

function Checkout() {
  const navigate = useNavigate()
  const procesando = useRef(false)

  const { carrito, totalPrecio, confirmarCompra } = useCarrito()

  const [valores, setValores] = useState(datosIniciales)
  const [errores, setErrores] = useState({})
  const [resultadoPago, setResultadoPago] = useState('aprobado')

  function actualizarCampo(evento) {
    const { name, value } = evento.target

    setValores((anteriores) => ({
      ...anteriores,
      [name]: value,
      ...(name === 'region' ? { comuna: '' } : {}),
    }))

    setErrores((anteriores) => ({
      ...anteriores,
      [name]: '',
      ...(name === 'region' ? { comuna: '' } : {}),
    }))
  }

  function finalizarCompra(evento) {
    evento.preventDefault()

    if (procesando.current) {
      return
    }

    const datos = {
      ...valores,
      nombre: valores.nombre.trim(),
      apellido: valores.apellido.trim(),
      correo: valores.correo.trim().toLowerCase(),
      telefono: valores.telefono.trim(),
      direccion: valores.direccion.trim(),
    }

    const nuevosErrores = {}

    if (!datos.nombre || datos.nombre.length > 50) {
      nuevosErrores.nombre = 'Ingrese sus nombres, máximo 50 caracteres.'
    }

    if (!datos.apellido || datos.apellido.length > 100) {
      nuevosErrores.apellido = 'Ingrese sus apellidos, máximo 100 caracteres.'
    }

    if (
      datos.correo.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)
    ) {
      nuevosErrores.correo = 'Ingrese un correo electrónico válido.'
    }

    if (!/^\d{9}$/.test(datos.telefono)) {
      nuevosErrores.telefono = 'Ingrese un teléfono de 9 dígitos.'
    }

    if (!['retiro', 'despacho'].includes(datos.entrega)) {
      nuevosErrores.entrega = 'Seleccione una modalidad de entrega.'
    }

    if (datos.entrega === 'despacho') {
      if (!Object.hasOwn(regiones, datos.region)) {
        nuevosErrores.region = 'Seleccione una región.'
      }

      if (!(regiones[datos.region] || []).includes(datos.comuna)) {
        nuevosErrores.comuna = 'Seleccione una comuna de esa región.'
      }

      if (!datos.direccion || datos.direccion.length > 300) {
        nuevosErrores.direccion = 'Ingrese una dirección, máximo 300 caracteres.'
      }
    }

    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    procesando.current = true

    const resultado = confirmarCompra(datos, resultadoPago)

    if (resultado.correcto) {
      navigate(`/compra-exitosa/${resultado.pedido.codigo}`, {
        replace: true,
      })
    } else {
      procesando.current = false

      navigate('/compra-fallida', {
        state: {
          mensaje: resultado.mensaje,
          datosCliente: datos,
        },
      })
    }
  }

  // Recupera los datos al reintentar un pago rechazado.
  // Se realiza mediante el estado inicial de la página de reintento:
  // el usuario puede volver y completar o revisar sus datos.

  if (carrito.length === 0) {
    return (
      <section className="checkout-pagina">
        <div className="container checkout-tarjeta">
          <h1>Tu carrito está vacío</h1>
          <Link to="/productos" className="checkout-boton">
            Ir al catálogo
          </Link>
        </div>
      </section>
    )
  }

  const carritoInvalido = carrito.some(
    (producto) =>
      !producto.disponible ||
      producto.cantidad > producto.stock
  )

  return (
    <section className="checkout-pagina">
      <div className="container">
        <h1 className="mb-4">Finalizar compra</h1>

        <p className="alert alert-info">
          Compra de demostración: no se realizará ningún cobro.
        </p>

        {carritoInvalido && (
          <p className="alert alert-danger">
            Hay productos no disponibles o cantidades superiores al stock.
            Revisa el carrito antes de continuar.
          </p>
        )}

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <form
              className="checkout-tarjeta"
              onSubmit={finalizarCompra}
              noValidate
            >
              <h2>Datos del cliente</h2>

              <div className="row g-3">
                {campos.map((campo) => (
                  <div className="col-12 col-md-6" key={campo.nombre}>
                    <label
                      htmlFor={`checkout-${campo.nombre}`}
                      className="form-label"
                    >
                      {campo.etiqueta}
                    </label>

                    <input
                      id={`checkout-${campo.nombre}`}
                      name={campo.nombre}
                      type={campo.tipo}
                      value={valores[campo.nombre]}
                      onChange={actualizarCampo}
                      className="form-control"
                      required
                      aria-invalid={Boolean(errores[campo.nombre])}
                      aria-describedby={
                        errores[campo.nombre]
                          ? `error-${campo.nombre}`
                          : undefined
                      }
                    />

                    {errores[campo.nombre] && (
                      <p
                        id={`error-${campo.nombre}`}
                        className="checkout-error"
                        role="alert"
                      >
                        {errores[campo.nombre]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <label htmlFor="checkout-entrega" className="form-label mt-4">
                Modalidad de entrega
              </label>

              <select
                id="checkout-entrega"
                name="entrega"
                value={valores.entrega}
                onChange={actualizarCampo}
                className="form-select"
              >
                <option value="retiro">Retiro en el almacén</option>
                <option value="despacho">Despacho a domicilio — simulado</option>
              </select>

              {errores.entrega && (
                <p className="checkout-error" role="alert">
                  {errores.entrega}
                </p>
              )}

              {valores.entrega === 'despacho' && (
                <div className="row g-3 mt-1">
                  <div className="col-12 col-md-6">
                    <label htmlFor="checkout-region" className="form-label">
                      Región
                    </label>

                    <select
                      id="checkout-region"
                      name="region"
                      value={valores.region}
                      onChange={actualizarCampo}
                      className="form-select"
                    >
                      <option value="">Seleccione una región</option>
                      {Object.keys(regiones).map((region) => (
                        <option key={region} value={region}>
                          {nombresRegiones[region]}
                        </option>
                      ))}
                    </select>

                    {errores.region && (
                      <p className="checkout-error" role="alert">
                        {errores.region}
                      </p>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="checkout-comuna" className="form-label">
                      Comuna
                    </label>

                    <select
                      id="checkout-comuna"
                      name="comuna"
                      value={valores.comuna}
                      onChange={actualizarCampo}
                      className="form-select"
                      disabled={!valores.region}
                    >
                      <option value="">Seleccione una comuna</option>
                      {(regiones[valores.region] || []).map((comuna) => (
                        <option key={comuna} value={comuna}>
                          {comuna}
                        </option>
                      ))}
                    </select>

                    {errores.comuna && (
                      <p className="checkout-error" role="alert">
                        {errores.comuna}
                      </p>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="checkout-direccion" className="form-label">
                      Dirección
                    </label>

                    <input
                      id="checkout-direccion"
                      name="direccion"
                      value={valores.direccion}
                      onChange={actualizarCampo}
                      className="form-control"
                    />

                    {errores.direccion && (
                      <p className="checkout-error" role="alert">
                        {errores.direccion}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <label htmlFor="resultado-pago" className="form-label mt-4">
                Resultado del pago simulado
              </label>

              <select
                id="resultado-pago"
                value={resultadoPago}
                onChange={(evento) => setResultadoPago(evento.target.value)}
                className="form-select"
              >
                <option value="aprobado">Pago aprobado</option>
                <option value="rechazado">Pago rechazado</option>
              </select>

              <div className="checkout-acciones mt-4">
                <button
                  type="submit"
                  className="checkout-boton"
                  disabled={carritoInvalido}
                >
                  Confirmar compra simulada
                </button>

                <Link to="/carrito" className="checkout-boton checkout-secundario">
                  Volver al carrito
                </Link>
              </div>
            </form>
          </div>

          <div className="col-12 col-lg-4">
            <aside className="checkout-tarjeta">
              <h2>Resumen</h2>

              {carrito.map((producto) => (
                <p key={producto.codigo}>
                  {producto.nombre} × {producto.cantidad}
                  <br />
                  ${(
                    producto.precio * producto.cantidad
                  ).toLocaleString('es-CL')}
                </p>
              ))}

              <hr />

              <p className="checkout-total">
                Total: ${totalPrecio.toLocaleString('es-CL')}
              </p>

              <p className="small">
                Esta simulación no añade un costo de despacho.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout