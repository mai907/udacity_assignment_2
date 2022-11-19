import e from 'express';
import Client from '../database';
import {Password} from '../utils/password'
import jwt from 'jsonwebtoken';

export type User ={
    id: number;
    firstname: string;
    lastname: string;
    email:string;
    password: string;
};

export class UserStore {
    async index(): Promise<User[]> {
 try{
     const conn = await Client.connect();
     const sql = 'SELECT * FROM users';
     const result = await conn.query(sql);
     conn.release();
     return result.rows;
 }
 catch(error){
    console.log(error)
     throw new Error(`cannot get users ${error}`)
 }
    }
 
    async show(id: string): Promise<User> {
        try {
          const sql = 'SELECT * FROM users WHERE id=($1)'
          //@ts-ignoreX$
          const conn = await Client.connect()
          const result = await conn.query(sql, [id])
          conn.release()
          return result.rows[0]
        } catch (err) {
          throw new Error(`unable show user ${id}: ${err}`)
        }
      }

   async create(firstname:string, lastname:string, email:string, password:string): Promise<User>{
    try{
        const conn = await Client.connect();
        const passwordHashed = await Password.toHash(password)
        const sql = 'INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING id, firstname, lastname, email';
        const result = await conn.query(sql,[firstname,lastname,email, passwordHashed]);
        conn.release();
        return result.rows[0];
    }
    catch(error){
        throw new Error(`cannot get users ${error}`)
    }
  }

  async update(user: User): Promise<User | null>{
    return null;
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await Client.connect()
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id])
      const user = result.rows[0]
      conn.release()
      return user

    } catch(err) {
      throw new Error(`unable delete user (${id}): ${err}`)
    }
  }

async findOneByEmail(email: string): Promise<User | null>{

  try{  
    console.log('email', email)
    const conn = await Client.connect()
    const sql = 'SELECT * FROM users WHERE email=($1)'
    const result = await conn.query(sql, [email])
    conn.release()
    if(result?.rows[0]){
       return result.rows[0]   
    }
    return null;
}
catch(err){
    console.log(err)
    throw new Error(`unable to find user: ${err}`)

}
   
  }

static async findOneById(id: string): Promise<User> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const result = await conn.query(sql, [id])
      const user = result.rows[0]
      conn.release()
      return user

    } catch(err) {
      throw new Error(`unable delete user (${id}): ${err}`)
    }
  }

  async login(email:string,password:string){

    const user = await this.findOneByEmail(email);
    if(!user){
       throw new Error(`Invalid User`) 
    }

    const isMatch = await Password.compare(user.password, password);
    if(isMatch){
      const token =jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
      process.env.TOKEN_SECRET!,
      );

      const userSerialization = user as User;
      userSerialization.password = '';

      const result = { user: userSerialization, token };
      return result;
    }else{
        throw new Error(`Invalid User`) 
    }
  }

 
 }