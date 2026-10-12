import { useState } from 'react'
import '../../styles/FormularioContacto.css'

const valoresIniciales = {
  nombre: '',
  apellido: '',
  correo: '',
  telefono: '',
  mensaje: '',
}

const campos = [
  {
    nombre: 'nombre',
    etiqueta: 'Nombres:',
    placeholder: 'Ingrese sus nombres...',
    tipo: 'text',
    autoComplete: 'given-name',
  },
  {
    nombre: 'apellido',
    etiqueta: 'Apellidos:',
    placeholder: 'Ingrese sus apellidos...',
    tipo: 'text',
    autoComplete: 'family-name',
  },
  {
    nombre: 'correo',
    etiqueta: 'Correo:',
    placeholder: 'correo@gmail.com',
    tipo: 'email',
    autoComplete: 'email',
  },
  {
    nombre: 'telefono',
    etiqueta: 'Teléfono:',
    placeholder: 'Ingrese un teléfono de 9 dígitos...',
    tipo: 'tel',
    autoComplete: 'tel',
  },
  {
    nombre: 'mensaje',
    etiqueta: 'Mensaje:',
    placeholder: 'Escriba en este cuadro su mensaje...',
  },
]

function correoPermitido(correo) {
  return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(
    correo.trim().toLowerCase()
  )
}

function validarFormulario(valores) {
  const errores = {}

  if (!valores.nombre) {
    errores.nombre = 'El nombre es obligatorio'
  } else if (valores.nombre.length > 100) {
    errores.nombre = 'El nombre no puede superar los 100 caracteres'
  }

  if (!valores.apellido) {
    errores.apellido = 'El apellido es obligatorio'
  } else if (valores.apellido.length > 100) {
    errores.apellido = 'Los apellidos no pueden superar los 100 caracteres'
  }

  if (!valores.correo) {
    errores.correo = 'El correo es obligatorio'
  } else if (valores.correo.length > 100) {
    errores.correo = 'El correo no puede superar los 100 caracteres'
  } else if (!correoPermitido(valores.correo)) {
    errores.correo =
      'Ingrese un correo @duoc.cl, @profesor.duoc.cl o @gmail.com'
  }

  if (!valores.telefono) {
    errores.telefono = 'El teléfono es obligatorio'
  } else if (!/^\d{9}$/.test(valores.telefono)) {
    errores.telefono = 'Ingrese un teléfono de 9 dígitos'
  }

  if (!valores.mensaje) {
    errores.mensaje = 'El mensaje es obligatorio'
  } else if (valores.mensaje.length > 500) {
    errores.mensaje = 'El mensaje no puede superar los 500 caracteres'
  }

  return errores
}

function FormularioContacto() {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})
  const [resultado, setResultado] = useState('')

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

    setResultado('')
  }

  function enviarMensaje(evento) {
    evento.preventDefault()
    setResultado('')

    const valoresLimpios = Object.fromEntries(
      Object.entries(valores).map(([campo, valor]) => [
        campo,
        valor.trim(),
      ])
    )

    const nuevosErrores = validarFormulario(valoresLimpios)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    setResultado(
      `${valoresLimpios.nombre} ${valoresLimpios.apellido}, ` +
        'tu formulario se validó correctamente. ' +
        'Este envío es una simulación; todavía no se envía un correo.'
    )

    setValores({ ...valoresIniciales })
  }

  return (
    <section className="contacto-contenido">
      <form
        className="formulario-contacto"
        onSubmit={enviarMensaje}
        noValidate
      >
        <h2>Formulario de Contacto</h2>

        <div className="contacto-campos">
          {campos.map((campo) => {
            const id = `contacto-${campo.nombre}`
            const error = errores[campo.nombre]

            const propiedades = {
              id,
              name: campo.nombre,
              className: 'form-control',
              placeholder: campo.placeholder,
              value: valores[campo.nombre],
              onChange: actualizarCampo,
              required: true,
              'aria-invalid': Boolean(error),
              'aria-describedby': error ? `${id}-error` : undefined,
            }

            return (
              <div className="mb-4" key={campo.nombre}>
                <label htmlFor={id} className="form-label">
                  {campo.etiqueta}
                </label>

                {campo.nombre === 'mensaje' ? (
                  <textarea {...propiedades} rows={6} />
                ) : (
                  <input
                    {...propiedades}
                    type={campo.tipo}
                    autoComplete={campo.autoComplete}
                    inputMode={
                      campo.nombre === 'telefono' ? 'numeric' : undefined
                    }
                  />
                )}

                {error && (
                  <p
                    id={`${id}-error`}
                    className="contacto-error"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
              </div>
            )
          })}

          <button type="submit" className="contacto-enviar">
            Enviar Mensaje
          </button>

          <p className="contacto-resultado" role="status">
            {resultado}
          </p>
        </div>
      </form>
    </section>
  )
}

export default FormularioContacto