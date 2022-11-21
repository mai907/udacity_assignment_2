import Client from '../database';

export interface Order {
    id: number;
    user_id: number;
    status: string;

};

export interface Order_products {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderStore {
    async index(): Promise<Order[]> {
 try{
     const conn = await Client.connect();
     const sql = 'SELECT * FROM orders';
     const result = await conn.query(sql);
     conn.release();
     return result.rows;
 }
 catch(error){
    console.log(error)
     throw new Error(`cannot get orders ${error}`)
 }
    }
 
    async show(id: string): Promise<Order> {
        try {
          const sql = 'SELECT * FROM orders WHERE id=($1)'
          //@ts-ignoreX$
          const conn = await Client.connect()
          const result = await conn.query(sql, [id])
          conn.release()
          return result.rows[0]
        } catch (err) {
          throw new Error(`unable show orders ${id}: ${err}`)
        }
      }

   async create(user_id:number, status:string): Promise<Order>{
    try{
        const conn = await Client.connect();
        const sql = 'INSERT INTO orders ( user_id, status) VALUES($1, $2) RETURNING *';
        const result = await conn.query(sql,[ user_id, status]);
        conn.release();
        return result.rows[0];
    }
    catch(error){
        throw new Error(`cannot add to  orders ${error}`)
    }
  }

  async addProduct(quantity: number, orderId: number, productId: number): Promise<Order_products> {
    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()

      const result = await conn
          .query(sql, [quantity, orderId, productId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`cannot add orders ${err}`)
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id])
      const order = result.rows[0]
      conn.release()
      return order

    } catch(err) {
      throw new Error(`unable delete orders (${id}): ${err}`)
    }
  }

 
 }