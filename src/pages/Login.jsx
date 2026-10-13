import FormularioLogin from '../components/organisms/FormularioLogin'
import '../styles/Login.css'

function Login() {
  return (
    <>
      <section className="login-presentacion">
        <h1>Iniciar Sesión</h1>
        <p>Bienvenido a La Parada del Medio</p>
      </section>

      <FormularioLogin />
    </>
  )
}

export default Login