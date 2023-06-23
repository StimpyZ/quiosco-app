import Head from 'next/head'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AdminLayout ({ children, pagina }) {

    return (
        <>
            <Head>
                <title>Café - {pagina}</title>
                <meta name="description" content="Quosco Cafetería" />
            </Head>

            <div className="md:flex">
                <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 py-5">
                    <Image
                        width={0}
                        height={0}
                        sizes='(max-width: 768px) 200px, 300px'
                        style={{ width: '200px', height: 'auto' }}
                        src="/assets/img/logo.svg"
                        alt="imagen logotipo"
                    />
                </aside>

                <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                    <div className="p-10">
                        {children}
                    </div>
                </main>
            </div>
            <ToastContainer />
        </>
    )

}
