import '../../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer-tienda">
      <div className="container-fluid px-4">
        <div className="row g-4">
          <div className="col-12 col-md-4 text-center">
            <img
              src="/img/logo/logo.png"
              alt="La Parada del Medio"
              className="footer-logo"
            />
          </div>

          <div className="col-12 col-md-4">
            <h2 className="footer-titulo">Horario de Atención</h2>
            <p>Lunes a Viernes de 08:00 a 22:00 hrs</p>
            <p>Sábados y Domingos de 09:00 a 19:00 hrs</p>
          </div>

          <div className="col-12 col-md-4">
            <h2 className="footer-titulo">Contacto</h2>
            <p>
              Teléfono:{' '}
              <a href="tel:+56912345678">+56 9 12345678</a>
            </p>
            <p>
              Correo:{' '}
              <a href="mailto:contacto@laparadadelmedio.cl">
                contacto@laparadadelmedio.cl
              </a>
            </p>
          </div>
        </div>

        <p className="footer-copyright">
          © {new Date().getFullYear()} La Parada del Medio
        </p>
      </div>
    </footer>
  )
}

export default Footer