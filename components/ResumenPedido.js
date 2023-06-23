import Image from 'next/image'
import formatMoney from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

export default function ResumenPedido ({ pedidos }) {

    const { handleEditarCantidad, handleEliminarPedido } = useQuiosco()

    return (
        <div className="shadow p-5 mb-3 flex gap-10 items-center">
            <div className="md:w-1/6">
                <Image
                    width={300}
                    height={400}
                    src={`/assets/img/${pedidos.imagen}.jpg`}
                    alt={`Imagen de ${pedidos.nombre}`}
                />
            </div>

            <div className="md:w-4/6 flex flex-col gap-3">
                <p className="text-3xl font-bold">{pedidos.nombre}</p>
                <p >
                    Cantidad:{' '}
                    <span>
                        {pedidos.cantidad}
                    </span>
                </p>
                <p className="text-xl">
                    Precio: <span className='text-amber-500'>{formatMoney(pedidos.precio)}</span>
                </p>
                <p className="text-sm ">
                    Subtotal:{' '}
                    <span className="text-amber-500">
                        {formatMoney(pedidos.precio * pedidos.cantidad)}
                    </span>
                </p>
            </div>

            <div className='md:w-1/6 flex flex-col gap-4'>
                <button
                    onClick={() => (handleEditarCantidad(pedidos.id))}
                    className="bg-indigo-600 hover:bg-indigo-800 w-full text-white p-2 border border-indigo-900 text-sm font-bold transition-colors uppercase">Editar</button>

                <button
                    onClick={() => (handleEliminarPedido(pedidos.id))}
                    className="bg-red-600 hover:bg-red-800 w-full text-white p-2 border border-red-900 text-sm font-bold transition-colors uppercase">Eliminar</button>
            </div>
        </div>
    )

}
