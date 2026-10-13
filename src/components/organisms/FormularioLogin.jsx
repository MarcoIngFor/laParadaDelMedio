import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { obtenerUsuarios } from '../../data/Usuarios'
import '../../styles/FormularioLogin.css'

function FormularioLogin() {
  const navigate = useNavigate()

  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')

  function iniciarSesion(evento) {
    evento.preventDefault()
    setMensaje('')

    const correoLimpio = correo.trim().toLowerCase()
    const nuevosErrores = {}

    if (!correoLimpio) {
      nuevosErrores.correo = 'Debe ingresar un correo electrónico'
    } else if (correoLimpio.length > 100) {
      nuevosErrores.correo =
        'El correo no puede superar los 100 caracteres'
    } else if (
      !/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(
        correoLimpio
      )
    ) {
      nuevosErrores.correo =
        'Ingrese un correo @duoc.cl, @profesor.duoc.cl o @gmail.com'
    }

    if (!password) {
      nuevosErrores.password = 'Debe ingresar una contraseña'
    } else if (password.length < 4 || password.length > 10) {
      nuevosErrores.password =
        'La contraseña debe tener entre 4 y 10 caracteres'
    }

    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    const usuarios = obtenerUsuarios()

    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.correo?.trim().toLowerCase() === correoLimpio &&
        usuario.password === password
    )

    if (!usuarioEncontrado) {
      setMensaje('Correo o contraseña incorrectos')
      return
    }

    // La sesión conserva los datos del usuario, sin su contraseña.
    const usuarioSesion = { ...usuarioEncontrado }
    delete usuarioSesion.password

    localStorage.setItem(
      'usuarioActivo',
      usuarioEncontrado.tipoUsuario
    )

    localStorage.setItem(
      'usuarioSesion',
      JSON.stringify(usuarioSesion)
    )

    // Por ahora todos vuelven al inicio.
    // Cuando creemos el panel, conectaremos admin y vendedor.
    const destino = usuarioEncontrado.tipoUsuario === 'admin' || usuarioEncontrado.tipoUsuario === 'vendedor' ? '/admin': '/'

    navigate(destino, { replace: true })
    }

  return (
    <section className="login-contenido">
      <form
        className="formulario-login"
        onSubmit={iniciarSesion}
        noValidate
      >
        <h2>Acceso de Usuario</h2>

        <div className="login-campos">
          <div className="mb-4">
            <label htmlFor="correo-login" className="form-label">
              👤 Correo Electrónico
            </label>

            <input
              id="correo-login"
              name="correo"
              type="email"
              className="form-control"
              placeholder="correo@gmail.com"
              autoComplete="username"
              value={correo}
              onChange={(evento) => {
                setCorreo(evento.target.value)
                setErrores((anteriores) => ({
                  ...anteriores,
                  correo: '',
                }))
                setMensaje('')
              }}
              required
              aria-invalid={Boolean(errores.correo)}
              aria-describedby={
                errores.correo ? 'error-correo-login' : undefined
              }
            />

            {errores.correo && (
              <p
                id="error-correo-login"
                className="login-error"
                role="alert"
              >
                {errores.correo}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password-login" className="form-label">
              🔒 Contraseña
            </label>

            <input
              id="password-login"
              name="password"
              type="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
              value={password}
              onChange={(evento) => {
                setPassword(evento.target.value)
                setErrores((anteriores) => ({
                  ...anteriores,
                  password: '',
                }))
                setMensaje('')
              }}
              required
              aria-invalid={Boolean(errores.password)}
              aria-describedby={
                errores.password ? 'error-password-login' : undefined
              }
            />

            {errores.password && (
              <p
                id="error-password-login"
                className="login-error"
                role="alert"
              >
                {errores.password}
              </p>
            )}
          </div>

          <button type="submit" className="login-boton">
            Iniciar Sesión
          </button>

          {mensaje && (
            <p className="login-error mt-3" role="alert">
              {mensaje}
            </p>
          )}

          <p className="login-registro">
            ¿No tienes una cuenta?{' '}
            <Link to="/registro">Crear cuenta</Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default FormularioLogin