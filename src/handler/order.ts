import express, {Request, Response} from 'express';
import { OrderStore} from '../models/order';
import {userExist} from '../middlewares/token'

const store = new OrderStore()

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
        product_id, user_id, quantity, status
    }= req.body
    const products = await store.create(product_id, user_id, quantity, status)
    res.json(products)
}

const destroy = async (req:Request, res:Response) => {
    const id = req.params.id as string
    const user = await store.delete(id)
    res.json(user)
}



const OrdersRoutes = (app: express.Application) => {
    app.get('/orders',userExist, index)
    app.get('/orders/:id',userExist, show)   
    app.post('/orders',userExist, create)
    app.delete('/orders/:id',userExist, destroy)
}

export default OrdersRoutes