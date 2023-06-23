import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import Categoria from './Categoria'

export default function Sidebar () {

    const { categorias } = useQuiosco()

    return (
        <>
            <Image
                width={0}
                height={0}
                sizes='(max-width: 200px) 100vw, 640px'
                src="/assets/img/logo.svg"
                alt="Imagen del logotipo de la app"
                className='mx-auto'
                style={{ width: '200px', height: 'auto' }}
            />

            <nav className="mt-10">
                {categorias.map((categoria) => (
                    <Categoria key={categoria.id} categorias={categoria} />
                ))}
            </nav>
        </>
    )

}
