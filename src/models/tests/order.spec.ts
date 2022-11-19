// import { Order ,OrderStore} from "../order";
// import {ProductStore}from "../product"
// import {UserStore}from "../user"
// import Client from '../../database';


// const store = new OrderStore();
// const storeProduct = new ProductStore()
// const storeUser = new UserStore()

// describe("Order Model", ()=>{
//     beforeAll(async () => {
//         const conn = await Client.connect()
//         const sql = 'TRUNCATE users CASCADE'
//          await conn.query(sql)
//         conn.release()
      
//       })

//     it("should have an index method", ()=>{
//         expect(store.index).toBeDefined();
//     });

//     it('index method should return a list of orders', async () => {
//         const result = await store.index(); 
//         expect(result).toBeDefined();
//     })

//     it("Create Product", async () => {
//         const name = "product_1", price = 50, category = "clothes";
//         const firstname = "user", lastname = "test", email = "user@t.com", password = "123456";
//         const quantity=10, status="active"
//         const product = await storeProduct.create(name, price, category);
//         const user = await storeUser.create(firstname, lastname, email, password);
//         const result = await store.create(product?.id, user?.id, quantity, status);

//         expect(result?.status).toEqual(status);
//       });
 

// })