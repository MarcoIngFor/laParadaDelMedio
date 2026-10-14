import { useState } from 'react'
import FormularioUsuario from '../molecules/FormularioUsuario'
import {
  obtenerUsuarios,
  guardarUsuarios,
  validarRun,
} from '../../data/Usuarios'
import { regiones, nombresRegiones } from '../../data/Regiones'

const formularioInicial = {
  run: '',
  nombre: '',
  apellido: '',
  correo: '',
  password: '',
  fechaNacimiento: '',
  tipoUsuario: '',
  region: '',
  comuna: '',
  direccion: '',
}

function normalizarRun(run) {
  return String(run).trim().toUpperCase().replace(/[.-]/g, '')
}

function validarUsuario(datos, usuarios, correoOriginal) {
  const errores = {}

  if (!datos.run) {
    errores.run = 'El RUN es obligatorio'
  } else if (datos.run.includes('.') || datos.run.includes('-')) {
    errores.run = 'Ingrese el RUN sin puntos ni guion'
  } else if (datos.run.length < 7 || datos.run.length > 9) {
    errores.run = 'El RUN debe tener entre 7 y 9 caracteres'
  } else if (!validarRun(datos.run)) {
    errores.run = 'El RUN ingresado no es válido'
  }

  if (!datos.nombre) {
    errores.nombre = 'El nombre es obligatorio'
  } else if (datos.nombre.length > 50) {
    errores.nombre = 'Máximo 50 caracteres'
  }

  if (!datos.apellido) {
    errores.apellido = 'Los apellidos son obligatorios'
  } else if (datos.apellido.length > 100) {
    errores.apellido = 'Máximo 100 caracteres'
  }

  if (!datos.correo) {
    errores.correo = 'El correo es obligatorio'
  } else if (datos.correo.length > 100) {
    errores.correo = 'Máximo 100 caracteres'
  } else if (
    !/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(
      datos.correo
    )
  ) {
    errores.correo =
      'Correo permitido: @duoc.cl, @profesor.duoc.cl o @gmail.com'
  }

  if (!datos.password) {
    errores.password = 'La contraseña es obligatoria'
  } else if (datos.password.length < 4 || datos.password.length > 10) {
    errores.password = 'Debe tener entre 4 y 10 caracteres'
  }

  if (!['admin', 'vendedor', 'cliente'].includes(datos.tipoUsuario)) {
    errores.tipoUsuario = 'Debe seleccionar un tipo de usuario'
  }

  if (!Object.hasOwn(regiones, datos.region)) {
    errores.region = 'Debe seleccionar una región'
  }

  if (!(regiones[datos.region] || []).includes(datos.comuna)) {
    errores.comuna = 'Debe seleccionar una comuna de esa región'
  }

  if (!datos.direccion) {
    errores.direccion = 'La dirección es obligatoria'
  } else if (datos.direccion.length > 300) {
    errores.direccion = 'Máximo 300 caracteres'
  }

  const otrosUsuarios = usuarios.filter(
    (usuario) => usuario.correo.trim().toLowerCase() !== correoOriginal
  )

  if (
    !errores.run &&
    otrosUsuarios.some(
      (usuario) => normalizarRun(usuario.run) === datos.run
    )
  ) {
    errores.run = 'Este RUN ya se encuentra registrado'
  }

  if (
    !errores.correo &&
    otrosUsuarios.some(
      (usuario) => usuario.correo.trim().toLowerCase() === datos.correo
    )
  ) {
    errores.correo = 'Este correo ya se encuentra registrado'
  }

  return errores
}

function cargarUsuarios() {
  try {
    return { usuarios: obtenerUsuarios(), error: '' }
  } catch {
    return {
      usuarios: [],
      error: 'No se pudieron leer los usuarios guardados. No se modificarán.',
    }
  }
}

function GestorUsuarios({ sesion }) {
  const [carga] = useState(cargarUsuarios)
  const [usuarios, setUsuarios] = useState(carga.usuarios)
  const [valores, setValores] = useState({ ...formularioInicial })
  const [correoOriginal, setCorreoOriginal] = useState(null)
  const [correoSesion, setCorreoSesion] = useState(
    sesion.correo.trim().toLowerCase()
  )
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  const [seleccionado, setSeleccionado] = useState(null)

  const editando = correoOriginal !== null
  const esCuentaActual = correoOriginal === correoSesion

  function limpiarFormulario() {
    setValores({ ...formularioInicial })
    setCorreoOriginal(null)
    setErrores({})
  }

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

    setMensaje('')
  }

  function persistir(nuevosUsuarios) {
    try {
      guardarUsuarios(nuevosUsuarios)
      setUsuarios(nuevosUsuarios)
      return true
    } catch {
      setMensaje('No se pudieron guardar los cambios en este navegador.')
      return false
    }
  }

  function guardarUsuario(evento) {
    evento.preventDefault()
    setMensaje('')

    const datos = {
      ...valores,
      run: valores.run.trim().toUpperCase(),
      nombre: valores.nombre.trim(),
      apellido: valores.apellido.trim(),
      correo: valores.correo.trim().toLowerCase(),
      direccion: valores.direccion.trim(),
    }

    const nuevosErrores = validarUsuario(
      datos,
      usuarios,
      correoOriginal
    )

    if (esCuentaActual && datos.tipoUsuario !== 'admin') {
      nuevosErrores.tipoUsuario =
        'No puedes cambiar el rol de tu sesión actual'
    }

    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    const nuevosUsuarios = editando
      ? usuarios.map((usuario) =>
          usuario.correo.trim().toLowerCase() === correoOriginal
            ? { ...usuario, ...datos }
            : usuario
        )
      : [...usuarios, datos]

    if (!persistir(nuevosUsuarios)) {
      return
    }

    if (esCuentaActual) {
      const datosSesion = { ...datos }
      delete datosSesion.password

      try {
        localStorage.setItem('usuarioSesion', JSON.stringify(datosSesion))
        setCorreoSesion(datos.correo)
      } catch {
        limpiarFormulario()
        setMensaje(
          'Usuario guardado. Vuelve a iniciar sesión para actualizar tu sesión.'
        )
        return
      }
    }

    const estabaEditando = editando

    limpiarFormulario()
    setSeleccionado(null)

    setMensaje(
      estabaEditando
        ? 'Usuario actualizado correctamente'
        : 'Usuario creado correctamente'
    )
  }

  function editarUsuario(usuario) {
    setCorreoOriginal(usuario.correo.trim().toLowerCase())

    setValores(
      Object.fromEntries(
        Object.keys(formularioInicial).map((campo) => [
          campo,
          usuario[campo] ?? '',
        ])
      )
    )

    setErrores({})
    setMensaje('')
    setSeleccionado(null)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function eliminarUsuario(usuario) {
    const correo = usuario.correo.trim().toLowerCase()

    if (correo === correoSesion) {
      setMensaje('No puedes eliminar la cuenta de tu sesión actual.')
      return
    }

    if (
      !window.confirm(
        `¿Desea eliminar a ${usuario.nombre} ${usuario.apellido}?`
      )
    ) {
      return
    }

    const nuevosUsuarios = usuarios.filter(
      (item) => item.correo.trim().toLowerCase() !== correo
    )

    if (!persistir(nuevosUsuarios)) {
      return
    }

    if (correoOriginal === correo) {
      limpiarFormulario()
    }

    setSeleccionado(null)
    setMensaje('Usuario eliminado correctamente')
  }

  if (carga.error) {
    return <p className="alert alert-danger">{carga.error}</p>
  }

  return (
    <>
      <FormularioUsuario
        valores={valores}
        errores={errores}
        editando={editando}
        esCuentaActual={esCuentaActual}
        onCambiar={actualizarCampo}
        onGuardar={guardarUsuario}
        onCancelar={() => {
          limpiarFormulario()
          setMensaje('')
        }}
      />

      <p className="gestion-mensaje" role="status">
        {mensaje}
      </p>

      {seleccionado && (
        <section className="gestion-tabla">
          <h2>Datos del Usuario</h2>

          <p><strong>RUN:</strong> {seleccionado.run}</p>
          <p>
            <strong>Nombre:</strong>{' '}
            {seleccionado.nombre} {seleccionado.apellido}
          </p>
          <p><strong>Correo:</strong> {seleccionado.correo}</p>
          <p>
            <strong>Fecha de nacimiento:</strong>{' '}
            {seleccionado.fechaNacimiento || 'No registrada'}
          </p>
          <p><strong>Rol:</strong> {seleccionado.tipoUsuario}</p>
          <p>
            <strong>Región:</strong>{' '}
            {nombresRegiones[seleccionado.region] || seleccionado.region}
          </p>
          <p><strong>Comuna:</strong> {seleccionado.comuna}</p>
          <p><strong>Dirección:</strong> {seleccionado.direccion}</p>

          <button
            type="button"
            className="gestion-boton"
            onClick={() => setSeleccionado(null)}
          >
            Cerrar detalle
          </button>
        </section>
      )}

      <section className="gestion-tabla">
        <h2>Usuarios registrados: {usuarios.length}</h2>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th scope="col">RUN</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Rol</th>
                <th scope="col">Región</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((usuario) => {
                const correo = usuario.correo.trim().toLowerCase()

                return (
                  <tr key={correo}>
                    <td>{usuario.run}</td>
                    <td>{usuario.nombre} {usuario.apellido}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.tipoUsuario}</td>
                    <td>
                      {nombresRegiones[usuario.region] || usuario.region}
                    </td>
                    <td>
                      <div className="gestion-acciones">
                        <button
                          type="button"
                          className="gestion-boton"
                          onClick={() => setSeleccionado(usuario)}
                        >
                          Ver
                        </button>

                        <button
                          type="button"
                          className="gestion-boton"
                          onClick={() => editarUsuario(usuario)}
                        >
                          Editar
                        </button>

                        {correo !== correoSesion && (
                          <button
                            type="button"
                            className="gestion-boton gestion-eliminar"
                            onClick={() => eliminarUsuario(usuario)}
                          >
                            Eliminar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}

              {usuarios.length === 0 && (
                <tr>
                  <td colSpan={6}>No existen usuarios registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default GestorUsuarios