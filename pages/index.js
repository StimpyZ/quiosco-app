import Producto from '../components/Producto'
import useQuiosco from '../hooks/useQuiosco'
import Layout from '../layout/layout'

export default function Home () {

    const { categoriaActual } = useQuiosco()

    return (
        <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
            <h1 className='text-4xl font-black'>{categoriaActual?.nombre}</h1>

            <p className='text-2xl my-10'>
                Elige y personaliza tu pedido
            </p>

            <div className='grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-4'>
                {categoriaActual?.productos?.map(producto => (
                    <Producto key={producto.id} productos={producto} />
                ))}
            </div>
        </Layout>
    )

}
