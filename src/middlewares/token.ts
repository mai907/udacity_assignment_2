import {Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';


export const userExist = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.headers?.authorization) {
      return res.status(403).send("Not Authorized")
    }
  
    const bearerToken = req.headers.authorization;
    const token = bearerToken!.split(' ')[1];
    const payload = jwt.verify(
      token,
      process.env.TOKEN_SECRET!,
    ) as User;
  
    const user = await UserStore.findOneById((payload?.id as unknown )as string);
    if(!user){
        res.status(403).send("Not Authorized")
    }
  
    next();
  };
