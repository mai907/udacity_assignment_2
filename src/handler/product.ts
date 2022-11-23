import express, { Request, Response } from "express";
import { ProductStore } from "../models/product";
import { userExist } from "../middlewares/token";

const store = new ProductStore();

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
    const { name, price, category } = req.body;
    const products = await store.create(name, price, category);
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

const ProductsRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", userExist, create);
  app.delete("/products/:id", userExist, destroy);
};

export default ProductsRoutes;
