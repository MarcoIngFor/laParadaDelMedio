const usuariosDemo = [
  {
    run: '190110222',
    nombre: 'Administrador',
    apellido: 'Demo',
    correo: 'admin@gmail.com',
    password: 'admin123',
    fechaNacimiento: '',
    tipoUsuario: 'admin',
    region: 'metropolitana',
    comuna: 'Cerrillos',
    direccion: 'La Parada del Medio',
  },
  {
    run: '165444787',
    nombre: 'Vendedor',
    apellido: 'Demo',
    correo: 'vendedor@gmail.com',
    password: 'vende123',
    fechaNacimiento: '',
    tipoUsuario: 'vendedor',
    region: 'metropolitana',
    comuna: 'Maipú',
    direccion: 'La Parada del Medio',
  },
  {
    run: '247969802',
    nombre: 'Cliente',
    apellido: 'Demo',
    correo: 'cliente@gmail.com',
    password: 'cliente1',
    fechaNacimiento: '',
    tipoUsuario: 'cliente',
    region: 'metropolitana',
    comuna: 'Cerrillos',
    direccion: 'La Parada del Medio',
  },
]

export function obtenerUsuarios() {
  const guardados = localStorage.getItem('usuarios')

  if (guardados !== null) {
    const usuarios = JSON.parse(guardados)

    if (!Array.isArray(usuarios)) {
      throw new Error('Los usuarios guardados no tienen un formato válido.')
    }

    return usuarios
  }

  const usuarios = usuariosDemo.map((usuario) => ({ ...usuario }))

  guardarUsuarios(usuarios)

  return usuarios
}

export function guardarUsuarios(usuarios) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios))
}

export function validarRun(run) {
  if (!/^\d{6,8}[0-9K]$/.test(run)) {
    return false
  }

  const cuerpo = run.slice(0, -1)
  const digitoIngresado = run.slice(-1)

  let suma = 0
  let multiplicador = 2

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
  }

  const resultado = 11 - (suma % 11)

  const digitoCorrecto =
    resultado === 11
      ? '0'
      : resultado === 10
        ? 'K'
        : String(resultado)

  return digitoIngresado === digitoCorrecto
}