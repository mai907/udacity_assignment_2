import { Order ,OrderStore} from "../order";
import {ProductStore}from "../product"
import {UserStore}from "../user"
import Client from '../../database';


const storeOrder = new OrderStore();
const storeProduct = new ProductStore()
const storeUser = new UserStore()

describe("Order Model", ()=>{
    beforeEach(async () => {
        const conn = await Client.connect()
        const sql = 'TRUNCATE users CASCADE'
         await conn.query(sql)
        conn.release()
      
      })

    it("should have an index method", ()=>{
        expect(storeOrder.index).toBeDefined();
    });

    it('index method should return a list of orders', async () => {
        const result = await storeOrder.index(); 
        expect(result).toBeDefined();
    })

    it("Create order", async () => {
        const firstname = "user", lastname = "test", email = "user@t.com", password = "123456";
        const status="active"
        const user = await storeUser.create(firstname, lastname, email, password);
        const result = await storeOrder.create(user?.id, status);

        expect(result?.status).toEqual(status);
      });
 
      it("Add Product to an order", async () => {
        const name = "product_1", price = 50, category = "clothes";
        const firstname = "user", lastname = "test", email = "user@t.com", password = "123456";
        const quantity=10, status="active"
        const product = await storeProduct.create(name, price, category);
        const user = await storeUser.create(firstname, lastname, email, password);
        const order = await storeOrder.create(user?.id, status);
        const result = await storeOrder.addProduct(quantity, order?.id, product?.id);

        expect(result?.quantity).toEqual(quantity);
      });
})