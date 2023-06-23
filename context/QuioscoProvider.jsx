import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useRouter } from 'next/router'

export const QuioscoContext = createContext()

export default function QuioscoProvider ({ children }) {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const getCategorias = async () => {

        const { data } = await axios('/api/categorias')
        setCategorias(data)

    }

    useEffect(() => {

        getCategorias()

    }, [])

    useEffect(() => {

        setCategoriaActual(categorias[0])

    }, [categorias])

    useEffect(() => {

        const calcularTotal = pedido.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0)

        setTotal(calcularTotal)

    }, [pedido])

    const handleClickCategoria = id => {

        const categoria = categorias.find(categoria => categoria.id === id)

        setCategoriaActual(categoria)

        router.push('/')

    }

    const handleSetProductos = productos => {

        setProducto(productos)

    }

    const handleModal = () => {

        setModal(!modal)

    }

    const handleAgregarPedido = ({ categoriaId, ...producto }) => {

        const pedidoActual = pedido.findIndex(pedido => pedido.id === producto.id)

        if (pedidoActual >= 0) {

            const pedidoActualizado = pedido.slice()
            pedidoActualizado[pedidoActual].cantidad = producto.cantidad
            setPedido(pedidoActualizado)

            toast.success('Guardado correctamente')

        } else {

            setPedido(prevState => [
                ...prevState,
                {
                    ...producto,
                    cantidad: producto.cantidad
                }
            ])

            toast.success('Producto agregado al pedido')

        }

        setModal(false)

    }

    const handleEditarCantidad = (id) => {

        const pedidoActual = pedido.filter(producto => producto.id === id)
        setProducto(pedidoActual[0])
        setModal(!modal)

    }

    const handleEliminarPedido = (id) => {

        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Estás seguro de que deseas eliminar este pedido?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {

                        const pedidoActual = pedido.filter((producto) => producto.id !== id)
                        setPedido(pedidoActual)
                        toast.success('Pedido eliminado exitosamente')

                    }
                },
                {
                    label: 'No',
                    onClick: () => {

                    }
                }
            ]
        })

    }

    const colocarOrden = async (e) => {

        e.preventDefault()

        try {

            await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toString() })

            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)
            toast.success('Pedido realizado exitosamente')

            setTimeout(() => {

                router.push('/')

            }, 4000)

        } catch (error) {

            console.log(error)

        }

    }

    const value = {
        categorias,
        handleClickCategoria,
        categoriaActual,
        producto,
        handleSetProductos,
        modal,
        handleModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidad,
        handleEliminarPedido,
        nombre,
        setNombre,
        colocarOrden,
        total

    }

    return (
        <QuioscoContext.Provider value={value}>
            {children}
        </QuioscoContext.Provider>
    )

}
