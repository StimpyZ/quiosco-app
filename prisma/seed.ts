import { categorias } from "./data/category";
import { productos } from "./data/products";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () : Promise<void> => {
    try {
        await prisma.categoria.createMany({
            data: categorias
        })
        await prisma.producto.createMany({
            data: productos
        })
    }
        catch (error) {
            console.error(error)
        }
    }

main()