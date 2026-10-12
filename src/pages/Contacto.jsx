import Bienvenida from '../components/organisms/Bienvenida'
import FormularioContacto from '../components/organisms/FormularioContacto'

function Contacto() {
  return (
    <>
      <Bienvenida
        titulo="Contacto"
        descripcion="Escríbenos y nos pondremos en contacto contigo."
      />

      <FormularioContacto />
    </>
  )
}

export default Contacto