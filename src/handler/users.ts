import express, {Request, Response} from 'express';
import { UserStore} from '../models/user';
import {userExist} from '../middlewares/token'

const store = new UserStore()

const index = async (req:Request, res:Response) => {
    const user = await store.index()
    res.json(user)
}

const show = async (req:Request, res:Response) => {
    const id = req.params.id as string
    const user = await store.show(id)
    res.json(user)
}

const create = async (req:Request, res:Response) => {
    const {
        firstname, lastname, email, password
    }= req.body
    const user = await store.create(firstname, lastname, email, password)
    res.json(user)
}

const destroy = async (req:Request, res:Response) => {
    const id = req.params.id as string
    const user = await store.delete(id)
    res.json(user)
}

const login = async (req:Request, res:Response) => {
    const {email, password} = req.body;
    const user = await store.login(email, password)
    res.json(user)
}

const UsersRoutes = (app: express.Application) => {
    app.get('/users',userExist, index),
    app.get('/users/:id',userExist, show)   
    app.post('/users',userExist, create)
    app.delete('/users/:id',userExist, destroy)
    app.post('/users/login', login)

}

export default UsersRoutes