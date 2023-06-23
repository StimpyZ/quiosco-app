import React from 'react'
import AdminLayout from '../layout/adminLayout'
import useSWR from 'swr'
import axios from 'axios'
import Orden from '../components/Orden'

export default function Admin () {

    const fetcher = () => axios('/api/ordenes').then(datos => datos.data)

    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, { refreshInterval: 100 })

    return (
        <AdminLayout pagina={'Admin'}>
            <h1 className='text-4xl font-black'>Panel de administracion</h1>
            <p className='text-2xl my-10'>Administra tus ordenes</p>

            {data && data.length
                ? (
                    <div className='flex flex-col gap-4'>
                        {data.map(orden => (
                            <Orden key={orden.id} orden={orden} />
                        ))}
                    </div>
                )
                : <p>No hay ordenes pendientes</p>}
        </AdminLayout>
    )

}
