import express, { Request, Response } from "express";
import { UserStore } from "../models/user";
import { userExist } from "../middlewares/token";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const user = await store.index();
    res.json(user);
  } catch (err) {
    res.status(500).send(`Smothing want wrong ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const user = await store.show(id);
    res.json(user);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await store.create(firstname, lastname, email, password);
    res.json(user);
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

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await store.login(email, password);
    res.json(user);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
};

const UsersRoutes = (app: express.Application) => {
  app.get("/users", userExist, index), app.get("/users/:id", userExist, show);
  app.post("/users", create);
  app.delete("/users/:id", userExist, destroy);
  app.post("/users/login", login);
};

export default UsersRoutes;
