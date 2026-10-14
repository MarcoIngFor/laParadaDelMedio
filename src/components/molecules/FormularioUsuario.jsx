import { regiones, nombresRegiones } from '../../data/Regiones'

const campos = [
  { nombre: 'run', etiqueta: 'RUN sin puntos ni guion', tipo: 'text' },
  { nombre: 'nombre', etiqueta: 'Nombres', tipo: 'text' },
  { nombre: 'apellido', etiqueta: 'Apellidos', tipo: 'text' },
  { nombre: 'correo', etiqueta: 'Correo electrónico', tipo: 'email' },
  { nombre: 'password', etiqueta: 'Contraseña', tipo: 'password' },
  {
    nombre: 'fechaNacimiento',
    etiqueta: 'Fecha de nacimiento (opcional)',
    tipo: 'date',
  },
  { nombre: 'tipoUsuario', etiqueta: 'Tipo de usuario' },
  { nombre: 'region', etiqueta: 'Región' },
  { nombre: 'comuna', etiqueta: 'Comuna' },
  { nombre: 'direccion', etiqueta: 'Dirección', tipo: 'text' },
]

function FormularioUsuario({
  valores,
  errores,
  editando,
  esCuentaActual,
  onCambiar,
  onGuardar,
  onCancelar,
}) {
  function obtenerOpciones(campo) {
    if (campo === 'tipoUsuario') {
      return [
        { valor: 'admin', texto: 'Administrador' },
        { valor: 'vendedor', texto: 'Vendedor' },
        { valor: 'cliente', texto: 'Cliente' },
      ]
    }

    if (campo === 'region') {
      return Object.keys(regiones).map((region) => ({
        valor: region,
        texto: nombresRegiones[region],
      }))
    }

    if (campo === 'comuna') {
      return (regiones[valores.region] || []).map((comuna) => ({
        valor: comuna,
        texto: comuna,
      }))
    }

    return []
  }

  return (
    <form
      className="gestion-formulario"
      onSubmit={onGuardar}
      noValidate
    >
      <h2>{editando ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>

      <div className="row g-3">
        {campos.map((campo) => {
          const id = `usuario-${campo.nombre}`
          const error = errores[campo.nombre]

          const propiedades = {
            id,
            name: campo.nombre,
            value: valores[campo.nombre],
            onChange: onCambiar,
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
                  autoComplete={
                    campo.nombre === 'password' ? 'new-password' : undefined
                  }
                />
              ) : (
                <select
                  {...propiedades}
                  className="form-select"
                  disabled={
                    (campo.nombre === 'comuna' && !valores.region) ||
                    (campo.nombre === 'tipoUsuario' && esCuentaActual)
                  }
                >
                  <option value="">Seleccione una opción</option>

                  {obtenerOpciones(campo.nombre).map((opcion) => (
                    <option key={opcion.valor} value={opcion.valor}>
                      {opcion.texto}
                    </option>
                  ))}
                </select>
              )}

              {campo.nombre === 'tipoUsuario' && esCuentaActual && (
                <small>No puedes cambiar el rol de tu sesión actual.</small>
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
          {editando ? 'Guardar cambios' : 'Crear usuario'}
        </button>

        <button
          type="button"
          className="gestion-boton gestion-secundario"
          onClick={onCancelar}
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default FormularioUsuario