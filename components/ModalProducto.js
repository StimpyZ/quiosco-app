import { useEffect, useState } from 'react'
import formatMoney from '../helpers'
import useQuiosco from '../hooks/useQuiosco'
import Image from 'next/image'

export default function ModalProducto () {

    const { producto, handleModal, handleAgregarPedido, pedido } = useQuiosco()
    const { imagen, nombre, precio } = producto

    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)

    useEffect(() => {

        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {

            const pedidoActual = pedido.find(pedido => pedido.id === producto.id)
            setCantidad(pedidoActual.cantidad)
            setEdicion(true)

        }

    }, [producto, pedido])

    return (
        <div className="max-w-xs">
            <div className="relative">
                <button
                    className="absolute top-0 right-0"
                    onClick={handleModal}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7 text-amber-500 hover:text-amber-800 transition-colors"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            </div>
            <div>
                <Image
                    src={`/assets/img/${imagen}.jpg`}
                    alt={`Imagen del producto ${nombre}`}
                    width={350}
                    height={200}
                />
            </div>

            <div className="flex flex-col">
                <h1 className="text-3xl font-bold mt-5">{nombre}</h1>
                <p className="mt-5 font-black text-2xl text-amber-500">
                    {formatMoney(precio)}
                </p>
                <div className="mt-5 flex gap-4">
                    <button
                        className="transform hover:scale-125 transition-transform"
                        onClick={() => {

                            if (cantidad <= 1) return
                            setCantidad(cantidad - 1)

                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>

                    <label className="text-2xl px-4">{cantidad}</label>

                    <button
                        className="transform hover:scale-125 transition-transform"
                        onClick={() => setCantidad(cantidad + 1)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
                </div>

                <button
                    className="bg-indigo-600 hover:bg-indigo-800 text-white p-4 border border-indigo-900 text-2xl font-bold transition-colors uppercase mt-5"
                    onClick={() =>
                        handleAgregarPedido({ ...producto, cantidad })
                    }
                >
                    {edicion ? 'Guardar Cambios' : 'Agregar Pedido'}
                </button>
            </div>
        </div>
    )

}
