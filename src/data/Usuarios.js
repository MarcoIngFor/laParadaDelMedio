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
  let usuarios = []

  try {
    const datos = JSON.parse(guardados)
    usuarios = Array.isArray(datos) ? datos : []
  } catch {
    usuarios = []
  }

  usuariosDemo.forEach((usuarioDemo) => {
    const existe = usuarios.some(
      (usuario) =>
        usuario.correo?.trim().toLowerCase() === usuarioDemo.correo
    )

    if (!existe) {
      usuarios.push({ ...usuarioDemo })
    }
  })

  localStorage.setItem('usuarios', JSON.stringify(usuarios))

  return usuarios
}