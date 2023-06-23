import Image from 'next/image'
import formatMoney from '../helpers'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Orden ({ orden }) {

    const { id, nombre, total, pedido } = orden

    const completarOrden = async () => {

        try {

            await axios.post(`/api/ordenes/${id}`)
            toast.success('Orden completada')

        } catch (error) {

            toast.error(error.response.data)

        }

    }

    return (
        <div className="border-2 border-gray-100 shadow-lg p-10 space-y-5">
            <h3 className='text-2xl font-bold'>Orden: {id}</h3>
            <p className='text-lg my-10 font-bold'>Cliente: {nombre}</p>

            <div>
                {pedido.map(platillo => (
                    <div key={platillo.id} className="py-3 flex border-b last-of-type:border-0 items-center">
                        <div className="w-32">
                            <Image
                                src={`/assets/img/${platillo.imagen}.jpg`}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '400px', height: 'auto' }}
                                alt={`Imagen de ${platillo.nombre}`}
                            />
                        </div>
                        <div className='p-5 space-y-2'>
                            <h4 className='text-xl font-bold text-amber-500'>{platillo.nombre}</h4>
                            <p className='text-lg font-bold'>Cantidad: {platillo.cantidad}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='md:flex md:items-center md:justify-between my-10'>
                <p className='text-2xl font-black'>Total: <span className='text-amber-500'>{formatMoney(total)}</span>
                </p>

                <button
                    onClick={completarOrden}
                    type='button'
                    className="bg-indigo-600 hover:bg-indigo-800 text-white p-2 border border-indigo-900 text-lg font-bold transition-colors uppercase mt-5">
                    Completar orden
                </button>
            </div>
        </div>
    )

}
