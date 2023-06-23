import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'

export default function Categoria ({ categorias }) {

    const { handleClickCategoria, categoriaActual } = useQuiosco()
    const { nombre, icono, id } = categorias

    return (
        <button
            className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center w-full border p-5 hover:bg-amber-400 cursor-pointer transition`}
            onClick={() => handleClickCategoria(id)}
        >
            <Image
                width={0}
                height={0}
                sizes='(max-width: 70px) 100vw, 70px'
                style={{ width: '70px', height: '70px' }}
                src={`/assets/img/icono_${icono}.svg`}
                alt={`Icono de ${nombre}`}
                className="mr-5"
            />

            <p className="text-2xl font-bold">{nombre}</p>
        </button>
    )

}
