import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  obtenerUsuarios,
  guardarUsuarios,
  validarRun,
} from '../../data/Usuarios'
import { regiones, nombresRegiones } from '../../data/Regiones'
import '../../styles/Registro.css'

const valoresIniciales = {
  run: '',
  nombre: '',
  apellido: '',
  correo: '',
  password: '',
  fechaNacimiento: '',
  region: '',
  comuna: '',
  direccion: '',
}

const campos = [
  {
    nombre: 'run',
    etiqueta: 'RUN sin puntos ni guion',
    tipo: 'text',
    placeholder: 'Ejemplo: 123456785',
  },
  {
    nombre: 'nombre',
    etiqueta: 'Nombres',
    tipo: 'text',
    autoComplete: 'given-name',
  },
  {
    nombre: 'apellido',
    etiqueta: 'Apellidos',
    tipo: 'text',
    autoComplete: 'family-name',
  },
  {
    nombre: 'correo',
    etiqueta: 'Correo electrónico',
    tipo: 'email',
    placeholder: 'correo@gmail.com',
    autoComplete: 'email',
  },
  {
    nombre: 'password',
    etiqueta: 'Contraseña',
    tipo: 'password',
    placeholder: 'Entre 4 y 10 caracteres',
    autoComplete: 'new-password',
  },
  {
    nombre: 'fechaNacimiento',
    etiqueta: 'Fecha de nacimiento (opcional)',
    tipo: 'date',
    autoComplete: 'bday',
  },
  { nombre: 'region', etiqueta: 'Región' },
  { nombre: 'comuna', etiqueta: 'Comuna' },
  {
    nombre: 'direccion',
    etiqueta: 'Dirección',
    tipo: 'text',
    autoComplete: 'street-address',
  },
]

function validarRegistro(datos) {
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
    errores.nombre = 'El nombre no puede superar 50 caracteres'
  }

  if (!datos.apellido) {
    errores.apellido = 'Los apellidos son obligatorios'
  } else if (datos.apellido.length > 100) {
    errores.apellido = 'Los apellidos no pueden superar 100 caracteres'
  }

  if (!datos.correo) {
    errores.correo = 'El correo es obligatorio'
  } else if (datos.correo.length > 100) {
    errores.correo = 'El correo no puede superar 100 caracteres'
  } else if (
    !/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(
      datos.correo
    )
  ) {
    errores.correo =
      'Utilice correo @duoc.cl, @profesor.duoc.cl o @gmail.com'
  }

  if (!datos.password) {
    errores.password = 'La contraseña es obligatoria'
  } else if (datos.password.length < 4 || datos.password.length > 10) {
    errores.password = 'La contraseña debe tener entre 4 y 10 caracteres'
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
    errores.direccion = 'La dirección no puede superar 300 caracteres'
  }

  return errores
}

function FormularioRegistro() {
  const [valores, setValores] = useState({ ...valoresIniciales })
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  const [registroExitoso, setRegistroExitoso] = useState(false)

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
    setRegistroExitoso(false)
  }

  function registrarUsuario(evento) {
    evento.preventDefault()
    setMensaje('')
    setRegistroExitoso(false)

    const datos = {
      run: valores.run.trim().toUpperCase(),
      nombre: valores.nombre.trim(),
      apellido: valores.apellido.trim(),
      correo: valores.correo.trim().toLowerCase(),
      password: valores.password,
      fechaNacimiento: valores.fechaNacimiento,
      region: valores.region,
      comuna: valores.comuna,
      direccion: valores.direccion.trim(),
      tipoUsuario: 'cliente',
    }

    const nuevosErrores = validarRegistro(datos)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    let usuarios

    try {
      usuarios = obtenerUsuarios()
    } catch {
      setMensaje(
        'No se pudieron leer las cuentas guardadas. Intenta nuevamente.'
      )
      return
    }

    const erroresDuplicados = {}

    const runExiste = usuarios.some(
      (usuario) =>
        String(usuario.run)
          .trim()
          .toUpperCase()
          .replace(/[.-]/g, '') === datos.run
    )

    const correoExiste = usuarios.some(
      (usuario) =>
        usuario.correo.trim().toLowerCase() === datos.correo
    )

    if (runExiste) {
      erroresDuplicados.run = 'Este RUN ya se encuentra registrado'
    }

    if (correoExiste) {
      erroresDuplicados.correo = 'Este correo ya se encuentra registrado'
    }

    if (Object.keys(erroresDuplicados).length > 0) {
      setErrores(erroresDuplicados)
      return
    }

    try {
      guardarUsuarios([...usuarios, datos])
    } catch {
      setMensaje('No se pudo guardar tu cuenta en este navegador.')
      return
    }

    setValores({ ...valoresIniciales })
    setErrores({})
    setRegistroExitoso(true)
    setMensaje('Usuario registrado correctamente. Ya puedes iniciar sesión.')
  }

  function obtenerOpciones(campo) {
    if (campo === 'region') {
      return Object.keys(regiones).map((region) => ({
        valor: region,
        texto: nombresRegiones[region],
      }))
    }

    return (regiones[valores.region] || []).map((comuna) => ({
      valor: comuna,
      texto: comuna,
    }))
  }

  return (
    <section className="registro-contenido">
      <form
        className="formulario-registro"
        onSubmit={registrarUsuario}
        noValidate
      >
        <h2>Registro de Cliente</h2>

        <div className="row g-4">
          {campos.map((campo) => {
            const id = `registro-${campo.nombre}`
            const error = errores[campo.nombre]

            const propiedades = {
              id,
              name: campo.nombre,
              value: valores[campo.nombre],
              onChange: actualizarCampo,
              required: campo.nombre !== 'fechaNacimiento',
              'aria-invalid': Boolean(error),
              'aria-describedby': error ? `${id}-error` : undefined,
            }

            return (
              <div className="col-12 col-md-6" key={campo.nombre}>
                <label htmlFor={id} className="form-label">
                  {campo.etiqueta}
                </label>

                {campo.tipo ? (
                  <input
                    {...propiedades}
                    type={campo.tipo}
                    className="form-control"
                    placeholder={campo.placeholder}
                    autoComplete={campo.autoComplete}
                  />
                ) : (
                  <select
                    {...propiedades}
                    className="form-select"
                    disabled={
                      campo.nombre === 'comuna' && !valores.region
                    }
                  >
                    <option value="">
                      {campo.nombre === 'region'
                        ? 'Seleccione una región'
                        : valores.region
                          ? 'Seleccione una comuna'
                          : 'Seleccione primero una región'}
                    </option>

                    {obtenerOpciones(campo.nombre).map((opcion) => (
                      <option key={opcion.valor} value={opcion.valor}>
                        {opcion.texto}
                      </option>
                    ))}
                  </select>
                )}

                {error && (
                  <p
                    id={`${id}-error`}
                    className="registro-error"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <div className="registro-acciones">
          <button type="submit" className="registro-boton">
            Crear cuenta
          </button>
        </div>

        <p
          className={
            registroExitoso
              ? 'registro-mensaje registro-exito'
              : 'registro-mensaje registro-error'
          }
          role="status"
        >
          {mensaje}
        </p>

        <p className="registro-login">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login">Iniciar sesión</Link>
        </p>
      </form>
    </section>
  )
}

export default FormularioRegistro