import Client from '../database';

export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;

};

export class ProductStore {
    async index(): Promise<Product[]> {
 try{
     const conn = await Client.connect();
     const sql = 'SELECT * FROM products';
     const result = await conn.query(sql);
     conn.release();
     return result.rows;
 }
 catch(error){
    console.log(error)
     throw new Error(`cannot get users ${error}`)
 }
    }
 
    async show(id: string): Promise<Product> {
        try {
          const sql = 'SELECT * FROM products WHERE id=($1)'
          //@ts-ignoreX$
          const conn = await Client.connect()
          const result = await conn.query(sql, [id])
          conn.release()
          return result.rows[0]
        } catch (err) {
          throw new Error(`unable show products ${id}: ${err}`)
        }
      }

   async create(name:string, price:number, category:string): Promise<Product>{
    try{
        const conn = await Client.connect();
        const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
        const result = await conn.query(sql,[name,price,category]);
        conn.release();
        return result.rows[0];
    }
    catch(error){
        throw new Error(`cannot add to  products ${error}`)
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id])
      const user = result.rows[0]
      conn.release()
      return user

    } catch(err) {
      throw new Error(`unable delete products (${id}): ${err}`)
    }
  }

 
 }