import Cabecera from '../organisms/Cabecera'
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'

function LayoutTienda({ children }) {
  return (
    <>
        <header className="cabecera-tienda text-white py-3">
                <Cabecera />
                <Navbar />
        </header>

        <main>
            {children}
        </main>

        <Footer />
    </>
  )
}

export default LayoutTienda