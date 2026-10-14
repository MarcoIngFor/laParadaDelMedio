import FormularioRegistro from '../components/organisms/FormularioRegistro'
import '../styles/Registro.css'

function Registro() {
  return (
    <>
      <section className="registro-presentacion">
        <h1>Crear cuenta</h1>
        <p>Regístrate en La Parada del Medio.</p>
      </section>

      <FormularioRegistro />
    </>
  )
}

export default Registro