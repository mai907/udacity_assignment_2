import express, {Request, Response} from 'express';
import { ProductStore} from '../models/product';
import { userExist} from '../middlewares/token'

const store = new ProductStore()

const index = async (req:Request, res:Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req:Request, res:Response) => {
    const id = req.params.id as string
    const products = await store.show(id)
    res.json(products)
}

const create = async (req:Request, res:Response) => {
    const {
        name,price,category
    }= req.body
    const products = await store.create(name,price,category)
    res.json(products)
}

const destroy = async (req:Request, res:Response) => {
    const id = req.params.id as string
    const user = await store.delete(id)
    res.json(user)
}



const ProductsRoutes = (app: express.Application) => {
    app.get('/products',userExist, index)
    app.get('/products/:id',userExist, show)   
    app.post('/products',userExist, create)
    app.delete('/products/:id',userExist, destroy)
}

export default ProductsRoutes