import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categorias } from '../../data/Categorias'
import {
  obtenerCatalogo,
  guardarCatalogo,
} from '../../data/Catalogo'

const formularioInicial = {
  codigo: '',
  nombre: '',
  descripcion: '',
  precio: '',
  precioOferta: '',
  stock: '',
  stockCritico: '',
  categoria: '',
  imagen: '',
}

const campos = [
  { nombre: 'codigo', etiqueta: 'Código', tipo: 'text' },
  { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'text' },
  { nombre: 'descripcion', etiqueta: 'Descripción' },
  { nombre: 'precio', etiqueta: 'Precio normal', tipo: 'number' },
  {
    nombre: 'precioOferta',
    etiqueta: 'Precio de oferta (opcional)',
    tipo: 'number',
  },
  { nombre: 'stock', etiqueta: 'Stock', tipo: 'number' },
  {
    nombre: 'stockCritico',
    etiqueta: 'Stock crítico (opcional)',
    tipo: 'number',
  },
  { nombre: 'categoria', etiqueta: 'Categoría' },
  {
    nombre: 'imagen',
    etiqueta: 'Ruta de la imagen (opcional)',
    tipo: 'text',
  },
]

function cargarCatalogoAdmin() {
  return obtenerCatalogo({ aplicarOfertas: false })
}

function validarProducto(datos, catalogo, codigoOriginal) {
  const errores = {}

  if (!datos.codigo) {
    errores.codigo = 'El código es obligatorio'
  } else if (datos.codigo.length < 3) {
    errores.codigo = 'El código debe tener al menos 3 caracteres'
  } else if (
    catalogo.some(
      (producto) =>
        producto.codigo !== codigoOriginal &&
        producto.codigo.toLowerCase() === datos.codigo.toLowerCase()
    )
  ) {
    errores.codigo = 'El código del producto ya existe'
  }

  if (!datos.nombre) {
    errores.nombre = 'El nombre es obligatorio'
  } else if (datos.nombre.length > 100) {
    errores.nombre = 'El nombre no puede superar 100 caracteres'
  }

  if (datos.descripcion.length > 500) {
    errores.descripcion =
      'La descripción no puede superar 500 caracteres'
  }

  if (datos.precio === '') {
    errores.precio = 'El precio es obligatorio'
  } else if (
    !Number.isFinite(Number(datos.precio)) ||
    Number(datos.precio) < 0
  ) {
    errores.precio = 'El precio debe ser un número igual o mayor a 0'
  }

  if (
    datos.precioOferta !== '' &&
    (!Number.isFinite(Number(datos.precioOferta)) ||
      Number(datos.precioOferta) < 0 ||
      Number(datos.precioOferta) >= Number(datos.precio))
  ) {
    errores.precioOferta =
      'La oferta debe ser igual o mayor a 0 y menor que el precio normal'
  }

  if (datos.stock === '') {
    errores.stock = 'El stock es obligatorio'
  } else if (
    !Number.isInteger(Number(datos.stock)) ||
    Number(datos.stock) < 0
  ) {
    errores.stock =
      'El stock debe ser un número entero igual o mayor a 0'
  }

  if (
    datos.stockCritico !== '' &&
    (!Number.isInteger(Number(datos.stockCritico)) ||
      Number(datos.stockCritico) < 0)
  ) {
    errores.stockCritico =
      'El stock crítico debe ser un número entero igual o mayor a 0'
  }

  if (!categorias.some((categoria) => categoria.id === datos.categoria)) {
    errores.categoria = 'Debe seleccionar una categoría'
  }

  return errores
}

function GestorProductos({ esAdministrador }) {
  const [catalogo, setCatalogo] = useState(cargarCatalogoAdmin)
  const [valores, setValores] = useState({ ...formularioInicial })
  const [codigoOriginal, setCodigoOriginal] = useState(null)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')

  function limpiarFormulario() {
    setValores({ ...formularioInicial })
    setCodigoOriginal(null)
    setErrores({})
  }

  function actualizarCampo(evento) {
    const { name, value } = evento.target

    setValores((anteriores) => ({
      ...anteriores,
      [name]: value,
    }))

    setErrores((anteriores) => ({
      ...anteriores,
      [name]: '',
    }))

    setMensaje('')
  }

  function persistir(nuevoCatalogo) {
    try {
      guardarCatalogo(nuevoCatalogo)
      setCatalogo(nuevoCatalogo)
      setMensaje('')
      return true
    } catch {
      setMensaje('No se pudieron guardar los cambios en este navegador.')
      return false
    }
  }

  function guardarProducto(evento) {
    evento.preventDefault()

    if (!esAdministrador) {
      return
    }

    setMensaje('')

    const datos = Object.fromEntries(
      Object.entries(valores).map(([campo, valor]) => [
        campo,
        String(valor).trim(),
      ])
    )

    const nuevosErrores = validarProducto(
      datos,
      catalogo,
      codigoOriginal
    )

    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    const anterior = catalogo.find(
      (producto) => producto.codigo === codigoOriginal
    )

    const producto = {
      ...anterior,
      codigo: datos.codigo,
      nombre: datos.nombre,
      descripcion: datos.descripcion,
      precio: Number(datos.precio),
      precioOferta:
        datos.precioOferta === '' ? null : Number(datos.precioOferta),
      stock: Number(datos.stock),
      stockCritico:
        datos.stockCritico === '' ? null : Number(datos.stockCritico),
      categoria: datos.categoria,
      imagen: datos.imagen,
    }

    if (!anterior) {
      producto.id =
        Math.max(0, ...catalogo.map((item) => Number(item.id) || 0)) + 1
    }

    const estabaEditando = codigoOriginal !== null

    const nuevoCatalogo = estabaEditando
      ? catalogo.map((item) =>
          item.codigo === codigoOriginal ? producto : item
        )
      : [...catalogo, producto]

    if (!persistir(nuevoCatalogo)) {
      return
    }

    limpiarFormulario()

    setMensaje(
      estabaEditando
        ? 'Producto actualizado correctamente'
        : 'Producto creado correctamente'
    )
  }

  function editarProducto(producto) {
    if (!esAdministrador) {
      return
    }

    setCodigoOriginal(producto.codigo)

    setValores(
      Object.fromEntries(
        Object.keys(formularioInicial).map((campo) => [
          campo,
          producto[campo] == null ? '' : String(producto[campo]),
        ])
      )
    )

    setErrores({})
    setMensaje('')

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function eliminarProducto(producto) {
    if (!esAdministrador) {
      return
    }

    if (!window.confirm(`¿Desea eliminar "${producto.nombre}"?`)) {
      return
    }

    const nuevoCatalogo = catalogo.filter(
      (item) => item.codigo !== producto.codigo
    )

    if (!persistir(nuevoCatalogo)) {
      return
    }

    if (codigoOriginal === producto.codigo) {
      limpiarFormulario()
    }

    setMensaje('Producto eliminado correctamente')
  }

  return (
    <>
      {!esAdministrador && (
        <p className="alert alert-info">
          Modo Vendedor: puede consultar productos, pero no crear,
          editar ni eliminar.
        </p>
      )}

      {esAdministrador && (
        <form
          className="gestion-formulario"
          onSubmit={guardarProducto}
          noValidate
        >
          <h2>
            {codigoOriginal !== null ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>

          <div className="row g-3">
            {campos.map((campo) => {
              const id = `gestion-${campo.nombre}`
              const error = errores[campo.nombre]

              const propiedades = {
                id,
                name: campo.nombre,
                value: valores[campo.nombre],
                onChange: actualizarCampo,
                className: 'form-control',
                'aria-invalid': Boolean(error),
                'aria-describedby': error ? `${id}-error` : undefined,
              }

              return (
                <div className="col-12 col-md-6" key={campo.nombre}>
                  <label htmlFor={id} className="form-label">
                    {campo.etiqueta}
                  </label>

                  {campo.nombre === 'categoria' ? (
                    <select {...propiedades} className="form-select">
                      <option value="">Seleccione una categoría</option>

                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>
                  ) : campo.nombre === 'descripcion' ? (
                    <textarea {...propiedades} rows={3} />
                  ) : (
                    <input
                      {...propiedades}
                      type={campo.tipo}
                      min={campo.tipo === 'number' ? 0 : undefined}
                      step={
                        campo.tipo === 'number'
                          ? ['precio', 'precioOferta'].includes(campo.nombre)
                            ? 'any'
                            : 1
                          : undefined
                      }
                    />
                  )}

                  {campo.nombre === 'precioOferta' && (
                    <small>Deja este campo vacío para quitar la oferta.</small>
                  )}

                  {campo.nombre === 'imagen' && (
                    <small>
                      Ejemplo: /img/Productos/Abarrotes/arroz.png
                    </small>
                  )}

                  {error && (
                    <p
                      id={`${id}-error`}
                      className="gestion-error"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          <div className="gestion-acciones mt-4">
            <button type="submit" className="gestion-boton">
              {codigoOriginal !== null
                ? 'Guardar cambios'
                : 'Crear producto'}
            </button>

            <button
              type="button"
              className="gestion-boton gestion-secundario"
              onClick={() => {
                limpiarFormulario()
                setMensaje('')
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <p className="gestion-mensaje" role="status">
        {mensaje}
      </p>

      <section className="gestion-tabla">
        <h2>Productos registrados: {catalogo.length}</h2>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio normal</th>
                <th scope="col">Oferta</th>
                <th scope="col">Stock</th>
                <th scope="col">Stock crítico</th>
                <th scope="col">Categoría</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {catalogo.map((producto) => {
                const stockCritico =
                  producto.stockCritico != null &&
                  Number(producto.stock) <= Number(producto.stockCritico)

                const categoria = categorias.find(
                  (item) => item.id === producto.categoria
                )

                return (
                  <tr
                    key={producto.codigo}
                    className={stockCritico ? 'table-warning' : ''}
                  >
                    <td>{producto.codigo}</td>
                    <td>{producto.nombre}</td>
                    <td>
                      ${Number(producto.precio).toLocaleString('es-CL')}
                    </td>
                    <td>
                      {producto.precioOferta != null &&
                      producto.precioOferta !== ''
                        ? `$${Number(producto.precioOferta).toLocaleString('es-CL')}`
                        : '—'}
                    </td>
                    <td>
                      {producto.stock}
                      {stockCritico && <span title="Stock crítico"> ⚠️</span>}
                    </td>
                    <td>{producto.stockCritico ?? '—'}</td>
                    <td>{categoria?.nombre || producto.categoria}</td>
                    <td>
                      <div className="gestion-acciones">
                        <Link
                          to={`/productos/${encodeURIComponent(producto.codigo)}`}
                          state={{ desde: '/admin/productos' }}
                          className="gestion-boton"
                        >
                          Ver
                        </Link>

                        {esAdministrador && (
                          <>
                            <button
                              type="button"
                              className="gestion-boton"
                              onClick={() => editarProducto(producto)}
                            >
                              Editar
                            </button>

                            <button
                              type="button"
                              className="gestion-boton gestion-eliminar"
                              onClick={() => eliminarProducto(producto)}
                            >
                              Eliminar
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}

              {catalogo.length === 0 && (
                <tr>
                  <td colSpan={8}>No existen productos registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default GestorProductos