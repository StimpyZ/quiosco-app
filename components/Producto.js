import Image from 'next/image'
import formatMoney from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

export default function Producto ({ productos }) {

    const { handleSetProductos, handleModal } = useQuiosco()
    const { nombre, precio, imagen } = productos

    return (
        <div className="border p-3 flex flex-col justify-between">
            <Image
                src={`/assets/img/${imagen}.jpg`}
                alt={`Imagen del producto ${nombre}`}
                width={0}
                height={0}
                sizes='(max-width: 640px) 100vw, 640px'
                style={{ width: 'auto', height: 'auto' }}
            />
            <div className='p-5'>
                <h3 className='text-2xl font-bold'>{nombre}</h3>
                <p className='mt-5 font-black text-3xl text-amber-500'>{formatMoney(precio)}</p>
            </div>
            <button className='bg-indigo-600 hover:bg-indigo-800 w-full text-white p-3 border border-indigo-900 text-2xl font-bold transition-colors uppercase'
                onClick={() => {

                    handleSetProductos(productos)
                    handleModal()

                }}
            >Agregar</button>
        </div>
    )

}
