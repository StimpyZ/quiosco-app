import React, { useEffect, useCallback } from 'react'
import Layout from '../layout/layout'
import useQuiosco from '../hooks/useQuiosco'
import formatMoney from '../helpers'

export default function Total () {

    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco()

    const comprobarPedido = useCallback(() => {

        return pedido.length === 0 || nombre === '' || nombre.length < 3

    }, [pedido, nombre])

    useEffect(() => {

        comprobarPedido()

    }, [pedido, comprobarPedido])

    return (
        <Layout pagina="Total y confirmar pedido">
            <h1 className="text-4xl font-black">Total y confirmar pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

            <form onSubmit={colocarOrden}>
                <div>
                    <label
                        className="block text-gray-700 text-xl font-bold mb-2"
                        htmlFor="nombre"
                    >
                        Nombre
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">
                        Total a pagar: <span className="font-bold">{formatMoney(total)}</span>
                    </p>
                </div>

                <div className="mt-5">
                    <input
                        className={`${
                            comprobarPedido()
                                ? 'bg-indigo-100'
                                : 'bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out cursor-pointer'
                        } w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                        type="submit"
                        value="Confirmar pedido"
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    )

}
