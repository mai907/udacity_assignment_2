import express, { Request, Response } from "express";
import { OrderStore } from "../models/order";
import { userExist } from "../middlewares/token";

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const products = await store.show(id);
    res.json(products);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { product_id, user_id, quantity, status } = req.body;
    const products = await store.create(user_id, status);
    res.json(products);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const user = await store.delete(id);
    res.json(user);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const orderId: number = Number(req.params.id);
    const productId: number = req.body.productId;
    const quantity: number = parseInt(req.body.quantity);

    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const OrdersRoutes = (app: express.Application) => {
  app.get("/orders", userExist, index);
  app.get("/orders/:id", userExist, show);
  app.post("/orders", userExist, create);
  app.post("/orders/:id/products", userExist, addProduct);
  app.delete("/orders/:id", userExist, destroy);
};

export default OrdersRoutes;
